import { B2BPaymentType, type PaymentDetailsData, useCartResource } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useCartPaymentStore = defineStore('CartPaymentStore', () => {
  const cartResource = useCartResource()
  const cartStore = useCartStore()
  const { loadCart } = cartStore
  const { code, cart } = storeToRefs(cartStore)

  const paymentDetails = computed(() => cart.value?.paymentInfo)
  const billingAddress = computed(() => paymentDetails.value?.billingAddress)
  const paymentType = computed(() => cart.value?.paymentType)
  const paymentTypeId = computed(() => paymentType.value?.code)

  const addPaymentDetails = async (paymentDetails: PaymentDetailsData) => {
    await cartResource.addPaymentDetails(code.value, paymentDetails)
    await loadCart()
  }

  const setPaymentDetails = async (paymentDetailsId: string) => {
    await cartResource.setPaymentDetails(code.value, paymentDetailsId)
    await loadCart()
  }

  const setPaymentType = async (paymentType: B2BPaymentType | string, purchaseOrderNumber?: string) => {
    await cartResource.setPaymentType(code.value, paymentType, purchaseOrderNumber)
    await loadCart()
  }

  return {
    paymentDetails,
    billingAddress,
    paymentType,
    paymentTypeId,
    addPaymentDetails,
    setPaymentDetails,
    setPaymentType
  }
})
