import { useCartCostCenterStore, useCartDeliveryStore, useCartEntryStore, useCartPaymentStore, useCartStore } from '@/cart'
import { CheckoutFlow, CheckoutStep } from '@/checkout'
import { useCheckoutConfig } from '@/config'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export const useCheckoutStore = defineStore('CheckoutStore', () => {
  const router = useRouter()
  const checkoutConfig = useCheckoutConfig()
  const { isPickUpInStore } = storeToRefs(useCartEntryStore())
  const { isGuest } = storeToRefs(useCartStore())
  const { isB2BUser } = storeToRefs(useUserStore())
  const { isAccountPayment, hasPaymentType, hasPaymentDetails } = storeToRefs(useCartPaymentStore())
  const { hasDeliveryItems, hasDeliveryMode, hasDeliveryAddress } = storeToRefs(useCartDeliveryStore())
  const { hasCostCenter } = storeToRefs(useCartCostCenterStore())
  const flows = computed(() => checkoutConfig.value?.flows)
  const flow = computed(() => {
    if (isGuest.value) {
      return (isPickUpInStore.value && CheckoutFlow.MULTI_STEP_GUEST) || CheckoutFlow.MULTI_STEP_SHIPPING
    } else if (isB2BUser) {
      return (isAccountPayment && CheckoutFlow.MULTI_STEP_B2B_ACCOUNT) || CheckoutFlow.MULTI_STEP_B2B_HOSTED
    }
    return CheckoutFlow.MULTI_STEP_HOSTED
  })
  const steps = computed(() => (flows.value && flows.value[flow.value].map(v => v as CheckoutStep)) || [])
  const step = computed(() => router.currentRoute.value.params.id)

  const next = async (current?: CheckoutStep) => {
    const stepId = steps.value.findIndex(s => s === (current || step.value))
    const nextStep = (stepId > -1 && steps.value[stepId + 1]) || undefined
    nextStep && (await router.push({ name: 'checkoutStep', params: { id: nextStep } }))
  }

  const previous = async (current?: CheckoutStep) => {
    const stepId = steps.value.findIndex(s => s === (current || step.value))
    const previousStep = (stepId > -1 && steps.value[stepId - 1]) || undefined
    previousStep && (await router.push({ name: 'checkoutStep', params: { id: previousStep } }))
  }

  const isDisabled = (current: CheckoutStep) => steps.value.findIndex(s => s === current) > steps.value.findIndex(s => s === step.value)

  const proceed = async (destination: CheckoutStep) => {
    const hasDestination = steps.value.findIndex(s => s === destination) > -1
    hasDestination && (await router.push({ name: 'checkoutStep', params: { id: destination } }))
  }

  return {
    flows,
    flow,
    steps,
    step,
    isAccountPayment,
    hasPaymentType,
    hasDeliveryItems,
    hasDeliveryAddress,
    hasDeliveryMode,
    hasPaymentDetails,
    hasCostCenter,
    next,
    previous,
    isDisabled,
    proceed
  }
})
