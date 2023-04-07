import type { CartListData } from '@/api'
import { FieldLevelMapping, useCartResource, usePageable, useSaveCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { useCartConfig } from '@/config'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export enum SavedCartsMessage {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  FILE_EMPTY = 'FILE_EMPTY',
  LOADING = 'LOADING',
  FILE_TO_LARGE = 'FILE_TO_LARGE'
}

export enum SavedCartsSortBy {
  dateSaved = 'dateSaved',
  name = 'name',
  id = 'id',
  total = 'total'
}

export const useCartsStore = defineStore('CartsStore', () => {
  const { t } = useI18n()
  const cartConfig = useCartConfig()
  const cartResource = useCartResource()
  const { cart } = storeToRefs(useCartStore())
  const saveCartResource = useSaveCartResource()
  const { request, sort, pageSize, currentPage } = usePageable({
    sort: SavedCartsSortBy.dateSaved
  })
  const { user, isUser } = storeToRefs(useUserStore())
  const cartsPage = ref<CartListData>()
  const carts = computed(() => cartsPage.value?.carts)
  const importStatus = ref<SavedCartsMessage>()

  const loadCarts = async () =>
    (cartsPage.value = await cartResource.getCarts({
      savedCartsOnly: true,
      fields: FieldLevelMapping.FULL,
      ...request.value
    }))

  watch(user, async () => isUser.value && (await loadCarts()))

  const restore = async (code: string) => {
    if (isUser.value) {
      cart.value = await saveCartResource
        .restoreCart(code, {
          fields: FieldLevelMapping.FULL
        })
        .then(v => v.savedCartData)
      await loadCarts()
    }
  }
  const save = async (code = 'current', options: { saveCartName?: string; saveCartDescription?: string }) => {
    if (isUser.value) {
      const saved = await saveCartResource
        .saveCart(code, {
          fields: FieldLevelMapping.FULL,
          ...options
        })
        .then(v => v.savedCartData)
      saved && cartsPage.value?.carts.push(saved)
    }
  }
  const remove = async (code = 'current') => {
    if (isUser.value) {
      const removed = await saveCartResource.flagCartForDeletion(code).then(v => v.savedCartData)
      removed && cartsPage.value && (cartsPage.value.carts = cartsPage.value?.carts.filter(c => c.code !== removed.code))
    }
  }

  const clone = async (code = 'current', options: { name: string; description: string }) => {
    if (isUser.value) {
      const cloned = await saveCartResource
        .cloneCart(code, {
          fields: FieldLevelMapping.FULL,
          ...options
        })
        .then(v => v.savedCartData)
      cloned && cartsPage.value?.carts.push(cloned)
    }
  }

  const importCart = (file: File) => {
    const fileReader = new FileReader()
    fileReader.onload = async () => await importAndSaveCart(fileReader.result as string)
    fileReader.onerror = () => (importStatus.value = SavedCartsMessage.FAILED)
    importStatus.value = SavedCartsMessage.LOADING
    const { maxUploadSize } = cartConfig.value || {}
    ;(maxUploadSize && file.size <= maxUploadSize && fileReader.readAsBinaryString(file)) ||
      (importStatus.value = SavedCartsMessage.FILE_TO_LARGE)
  }

  const importAndSaveCart = async (file: string) => {
    if (!file) {
      importStatus.value = SavedCartsMessage.FILE_EMPTY
      return
    }
    const entries = file.split('\n').map(entry => {
      const [sku, quantity] = entry.split(',')
      return {
        sku,
        quantity: parseInt(quantity, 10)
      }
    })
    let cart
    try {
      cart = await cartResource.addCart()
    } catch {
      importStatus.value = SavedCartsMessage.FAILED
      return
    }
    if (cart?.code) {
      const entriesResult = []
      for (const entry of entries) {
        try {
          const entryResult = await cartResource.addEntry(cart.code, {
            product: { code: entry.sku },
            quantity: entry.quantity
          })
          entriesResult.push(entryResult)
        } catch {
          /* empty */
        }
      }
      const successfulLines = entriesResult.filter(entry => entry && entry.quantity === entry.quantityAdded).length
      const quantityAdjustLines = entriesResult.filter(entry => entry && entry.quantity !== entry.quantityAdded).length
      const failedLinesLines = entriesResult.filter(entry => !entry).length
      ;(successfulLines > 0 &&
        (await save(cart.code, {
          saveCartName: cart.name || cart.code,
          saveCartDescription: t('carts.importCart.savedCartDescription', {
            name: cart.name || cart.code || '',
            success: successfulLines,
            quantity: quantityAdjustLines,
            failed: failedLinesLines
          })
        }))) ||
        (await remove(cart.code))
    }
    importStatus.value = SavedCartsMessage.SUCCESS
  }

  return {
    sort,
    pageSize,
    currentPage,
    cartsPage,
    carts,
    restore,
    save,
    remove,
    clone,
    importCart,
    importStatus
  }
})
