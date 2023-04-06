import { type CartData, FieldLevelMapping, useCartResource, useSaveCartResource } from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useWishlistStore = defineStore('WishlistStore', () => {
  const cartResource = useCartResource()
  const saveCartResource = useSaveCartResource()
  const { isUser, isUserAllowed, user } = storeToRefs(useUserStore())
  const wishlist = ref<CartData>()
  const code = computed({
    get: () => wishlist.value?.code,
    set: async code => code && (wishlist.value = await get(code))
  })
  const entries = computed(() => wishlist.value?.entries)

  watch(isUser, async isUser => {
    if (isUser && isUserAllowed.value) {
      const name = `wishlist${user.value?.customerId}`
      const found = await find(name)
      wishlist.value = found || (await create(name))
    }
  })

  const addEntry = async (productCode: string) => {
    const { value } = code
    if (value) {
      // TODO optimize just set entry from modification?
      const modification = await cartResource.addEntry(value, {
        product: {
          code: productCode
        },
        quantity: 1
      })
      code.value = value
      return modification
    }
  }

  const hasEntry = (productCode: string) => entries.value?.find(e => productCode === e.product?.code)

  const delEntry = async (productCode: string) => {
    const { value } = code
    const { entryNumber } = hasEntry(productCode) || {}
    if (value && entryNumber) {
      // TODO optimize just set entry from modification?
      await cartResource.delEntry(value, entryNumber)
      code.value = value
    }
  }

  const create = async (saveCartName: string) => {
    const created = await cartResource.addCart()
    const saved = await saveCartResource.saveCart(created.code, { saveCartName })
    return saved.savedCartData
  }

  const find = async (name: string) =>
    cartResource
      .getCarts({
        savedCartsOnly: true,
        fields: FieldLevelMapping.FULL
      })
      .then(page => page.carts)
      .then(carts => carts.find(cart => cart.name === name))

  const get = (code: string) =>
    cartResource.getCart(code, {
      fields: FieldLevelMapping.FULL
    })

  return {
    addEntry,
    delEntry,
    hasEntry,
    wishlist
  }
})
