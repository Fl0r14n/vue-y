import { type B2BPaymentTypeData, type CardTypeData, type PaymentDetailsData, useMiscResource, usePaymentDetailsResource } from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

export const usePaymentStore = defineStore('PaymentStore', async () => {
  const miscResource = useMiscResource()
  const paymentDetailsResource = usePaymentDetailsResource()
  const cardTypes = ref<CardTypeData[]>()
  const paymentTypes = ref<B2BPaymentTypeData[]>()
  const { user, isUser } = storeToRefs(useUserStore())
  const payments = ref<PaymentDetailsData[]>()

  const loadPayments = async () => (payments.value = await paymentDetailsResource.getPaymentDetails({ saved: true }).then(p => p.payments))

  watch(user, async () => isUser.value && (await loadPayments()))

  const delPayment = async (id: string) => {
    await paymentDetailsResource.delPaymentDetail(id)
    await loadPayments()
  }

  const setPayment = async (id: string, payment: PaymentDetailsData) => {
    await paymentDetailsResource.setPaymentDetail(id, payment)
    await loadPayments()
  }

  const setDefaultPayment = (id: string) => setPayment(id, { defaultPayment: true })

  const init = async () => {
    cardTypes.value = await miscResource.getCardTypes().then(c => c.cardTypes)
    paymentTypes.value = await miscResource.getPaymentTypes().then(p => p.paymentTypes)
  }
  await init()

  return {
    cardTypes,
    paymentTypes,
    delPayment,
    setPayment,
    setDefaultPayment
  }
})
