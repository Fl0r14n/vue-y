import { type AddressData, type DeliveryModeData, FieldLevelMapping, useCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartDeliveryStore = defineStore('CartDelivery', () => {
  const cartResource = useCartResource()
  const cartStore = useCartStore()
  const { loadCart } = cartStore
  const { code, cart } = storeToRefs(cartStore)
  const deliveryEntries = computed(() => cart.value?.entries?.filter(entry => !entry.deliveryPointOfService))
  const deliveryAddress = computed(() => cart.value?.deliveryAddress)
  const hasDeliveryAddress = computed(() => !!(deliveryAddress.value && Object.keys(deliveryAddress.value).length))
  const deliveryMode = computed(() => cart.value?.deliveryMode)
  const hasDeliveryMode = computed(() => !!deliveryMode.value?.code)
  const deliveryModes = ref<DeliveryModeData[]>()
  const pickupEntries = computed(() => cart.value?.entries?.filter(entry => entry.deliveryPointOfService))
  const hasDeliveryItems = computed(() => !!deliveryEntries.value?.length)

  watch(code, async cCode => {
    deliveryModes.value = await cartResource.getDeliveryModes(cCode, { fields: FieldLevelMapping.FULL }).then(r => r.deliveryModes)
  })

  const addDeliveryAddress = async (address: AddressData) => {
    await cartResource.addDeliveryAddress(code.value, address)
    await loadCart()
  }

  const setDeliveryAddress = async (addressId: string) => {
    await cartResource.setDeliveryAddress(code.value, addressId)
    await loadCart()
  }

  const setDeliveryMode = async (deliveryModeId: string) => {
    await cartResource.setDeliveryMode(code.value, deliveryModeId)
    await loadCart()
  }

  return {
    pickupEntries,
    deliveryEntries,
    deliveryAddress,
    deliveryMode,
    deliveryModes,
    addDeliveryAddress,
    setDeliveryAddress,
    setDeliveryMode,
    hasDeliveryItems,
    hasDeliveryMode,
    hasDeliveryAddress
  }
})
