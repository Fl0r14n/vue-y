import { FieldLevelMapping, type OrderEntryData, useCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'

export interface AddToCartItem {
  product: { code: string }
  quantity: number
}

export const useCartEntryStore = defineStore('CartEntryStore', () => {
  const cartResource = useCartResource()
  const cartStore = useCartStore()
  const { loadCart } = cartStore
  const { code, cart } = storeToRefs(cartStore)

  const entries = computed(() => cart.value?.entries)

  const addEntries = async (orderEntries: OrderEntryData[]) => {
    await cartResource.addEntries(
      code.value,
      { orderEntries },
      {
        fields: FieldLevelMapping.FULL
      }
    )
    await loadCart()
  }

  const addEntry = async (entry: OrderEntryData) => {
    await cartResource.addEntry(code.value, entry, {
      fields: FieldLevelMapping.FULL
    })
    await loadCart()
  }

  const setEntry = async (entryId: number, item: AddToCartItem) => {
    await cartResource.setEntry(code.value, entryId, item)
    await loadCart()
  }

  const delEntry = async (entryId: number) => {
    await cartResource.delEntry(code.value, entryId)
    await loadCart()
  }

  return {
    addEntries,
    addEntry,
    setEntry,
    delEntry,
    entries
  }
})
