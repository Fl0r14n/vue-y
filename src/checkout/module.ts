import { CheckoutFlow, CheckoutStep } from '@/checkout/models'
import { getRouter, provideCmsTemplate, useCheckoutConfig } from '@/config'
import type { App } from 'vue'

export const createCheckout = () => ({
  install: (app: App) => {
    provideCmsTemplate('MultiStepCheckoutSummaryPageTemplate')(() => import('./templates/MultiStepCheckoutSummaryPageTemplate.vue'))
    const checkout = useCheckoutConfig().value
    if (checkout) {
      checkout.flows = {
        [CheckoutFlow.MULTI_STEP_B2B_HOSTED]: [
          CheckoutStep.PAYMENT_TYPE,
          CheckoutStep.DELIVERY_ADDRESS,
          CheckoutStep.DELIVERY_MODE,
          CheckoutStep.PAYMENT_DETAILS,
          CheckoutStep.FINAL_REVIEW
        ],
        [CheckoutFlow.MULTI_STEP_B2B_ACCOUNT]: [
          CheckoutStep.PAYMENT_TYPE,
          CheckoutStep.DELIVERY_ADDRESS,
          CheckoutStep.DELIVERY_MODE,
          CheckoutStep.FINAL_REVIEW
        ],
        [CheckoutFlow.MULTI_STEP_HOSTED]: [
          CheckoutStep.DELIVERY_ADDRESS,
          CheckoutStep.DELIVERY_MODE,
          CheckoutStep.PAYMENT_DETAILS,
          CheckoutStep.FINAL_REVIEW
        ],
        [CheckoutFlow.MULTI_STEP_SHIPPING]: [
          CheckoutStep.DELIVERY_ADDRESS,
          CheckoutStep.DELIVERY_MODE,
          CheckoutStep.PAYMENT_DETAILS,
          CheckoutStep.FINAL_REVIEW
        ],
        [CheckoutFlow.MULTI_STEP_GUEST]: [CheckoutStep.PAYMENT_DETAILS, CheckoutStep.FINAL_REVIEW]
      }
    }
    const router = getRouter(app)
    router.addRoute({
      path: '/checkout',
      name: 'checkout',
      component: () => null as any
      // beforeEnter: [CheckoutGuard, CheckoutStepGuard]
    })
    router.addRoute({
      path: '/checkout/:id',
      name: 'checkoutStep',
      // beforeEnter: [CheckoutGuard, HasPaymentTypeGuard, HasDeliveryAddressGuard, HasDeliveryModeGuard]
      component: () => () => import('../cms/components/CmsPage.vue')
    })
  }
})
