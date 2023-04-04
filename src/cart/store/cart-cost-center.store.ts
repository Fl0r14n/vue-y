import { useCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useCartCostCenterStore = defineStore('CartCostCenterStore', () => {
  const cartResource = useCartResource()
  const cartStore = useCartStore()
  const { loadCart } = cartStore
  const { code, cart } = storeToRefs(cartStore)

  const costCenter = computed(() => cart.value?.costCenter)
  const setCostCenter = async (costCenterId: string) => {
    await cartResource.setCostCenter(code.value, costCenterId)
    await loadCart()
  }

  return {
    costCenter,
    setCostCenter
  }
})
