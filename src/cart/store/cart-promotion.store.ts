import { useCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useCartPromotionStore = defineStore('CartPromotionStore', () => {
  const cartResource = useCartResource()
  const cartStore = useCartStore()
  const { loadCart } = cartStore
  const { code, cart } = storeToRefs(cartStore)

  const appliedVouchers = computed(() => cart.value?.appliedVouchers)
  const potentialOrderPromotions = computed(() => cart.value?.potentialOrderPromotions)
  const appliedOrderPromotions = computed(() => cart.value?.appliedOrderPromotions)

  const addVoucher = async (voucherId: string) => {
    await cartResource.addVoucher(code.value, voucherId)
    await loadCart()
  }

  return {
    addVoucher,
    appliedVouchers
  }
})
