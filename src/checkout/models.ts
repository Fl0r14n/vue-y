export enum CheckoutStep {
  PAYMENT_TYPE = 'payment-type',
  DELIVERY_ADDRESS = 'delivery-address',
  DELIVERY_MODE = 'delivery-mode',
  PAYMENT_DETAILS = 'payment-details',
  FINAL_REVIEW = 'review-order'
}

export enum CheckoutFlow {
  MULTI_STEP_HOSTED = 'MULTI_STEP_HOSTED',
  MULTI_STEP_GUEST = 'MULTI_STEP_GUEST',
  MULTI_STEP_SHIPPING = 'MULTI_STEP_SHIPPING',
  MULTI_STEP_B2B_HOSTED = 'MULTI_STEP_B2B_HOSTED',
  MULTI_STEP_B2B_ACCOUNT = 'MULTI_STEP_B2B_ACCOUNT'
}
