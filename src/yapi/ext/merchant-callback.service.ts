import { AuthRestClient } from '@/yapi/rest'

export class MerchantCallbackService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/integration`
  }

  /**
   * Verifies the decision of the merchant.
   * Note, the “Try it out” button is not editable for this method (always returns a category) because the Merchant Callback Controller
   * handles parameters differently, depending on which payment provider is used.
   * For more information about this controller,please refer to the “acceleratorwebservicesaddon AddOn” documentation on help.hybris.com.
   */
  verifyMerchantCallback() {
    return this.postAt<void>('merchant_callback', {})
  }

  /**
   * Verifies the decision of the merchant for a specified cart, and stores information of the PaymentSubscriptionResult for the cart.
   * Note, the “Try it out” button is not editable for this method (always returns a category) because the Merchant Callback Controller
   * handles parameters differently, depending on which payment provider is used.
   * For more information about this controller, please refer to the “acceleratorwebservicesaddon AddOn” documentation on help.hybris.com.
   * @param {string} cartId
   */
  verifyCartCallback(cartId: string) {
    return this.postAt<void>(`users/${this.userPath}/carts/${cartId}/payment/sop/response`, {})
  }
}
