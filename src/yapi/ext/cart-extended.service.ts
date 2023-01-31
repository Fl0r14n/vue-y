import { CartEndpoint } from '@/yapi/b2c'
import type { CartModificationListData, PaymentDetailsData, PaymentRequestData, PointOfServiceListData, RequestData } from '@/yapi/models'

export class CartExtendedService extends CartEndpoint {
  /**
   * Returns a list of stores that have all the pick-up items in stock.<br/>
   * Note, if there are no stores that have all the pick up items in stock, or all items are already set to the same pick up location,
   * the response returns an empty list.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getPickupLocations(cartId = 'current', queryParams?: RequestData) {
    return this.get<PointOfServiceListData>(`${cartId}/consolidate`, { params: queryParams })
  }

  /**
   * Specifies one store location where all items will be picked up.<br/>
   * Note, if any of the items are not available at the specified location, these items are removed from the cart.
   * @param {string} cartId
   * @param {string} storeName
   * @param {RequestData} queryParams
   */
  addPickupLocation(cartId = 'current', storeName: string, queryParams?: RequestData) {
    return this.postAt<CartModificationListData>(`${cartId}/consolidate`, {}, { params: { ...queryParams, storeName } })
  }

  /**
   * Returns the necessary information for creating a subscription that contacts the payment provider directly.<br/>
   * This information contains the payment provider URL and a list of parameters that are needed to create the subscription.
   * @param {string} cartId Cart identifier:
   * cart code for logged-in user, cart guid for anonymous user, 'current' for the last modified cart
   * @param {string} responseUrl The URL that the payment provider uses to return payment information.<br/>
   *     Possible values for responseUrl include the following:<br/>
   *     * “orderPage_cancelResponseURL”,
   *     * “orderPage_declineResponseURL”,
   *     * “orderPage_receiptResponseURL”.
   * @param {boolean} extendedMerchantCallback Define which url should be returned
   */
  getPaymentRequest(cartId = 'current', responseUrl: string, extendedMerchantCallback = false) {
    return this.get<PaymentRequestData>(`${cartId}/payment/sop/request`)
  }

  /**
   * Returns information related to creating subscription request results.
   * If there is no response from the payment provider, a "202 Accepted" status is returned.
   * If the subscription is created successfully, the payment details are returned. Otherwise, an category response is returned.<br/>
   * Note, the “Try it out” button is not editable for this method (always returns an category) because the Extended Carts Controller
   * handles parameters differently, depending on which payment provider is used.
   * For more information about this controller, please refer to the “acceleratorwebservicesaddon AddOn” documentation on help.hybris.com.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getPaymentResponse(cartId = 'current', queryParams?: RequestData) {
    return this.get<PaymentDetailsData>(`${cartId}/payment/sop/response`, { params: queryParams })
  }

  /**
   * Handles the response from the payment provider and creates payment details.<br/>
   * Note, the “Try it out” button is not editable for this method (always returns an category) because the Extended Carts Controller
   * handles parameters differently, depending on which payment provider is used.<br/>
   * For more information about this controller, please refer to the “acceleratorwebservicesaddon AddOn” documentation on help.hybris.com.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  addPaymentResponse(cartId = 'current', queryParams?: RequestData) {
    return this.postAt<PaymentDetailsData>(`${cartId}/payment/sop/response`, {}, { params: queryParams })
  }

  /**
   * Deletes the payment provider response related to the specified cart.
   * @param {string} cartId
   */
  delPaymentResponse(cartId = 'current') {
    return this.delete<void>(`${cartId}/payment/sop/response`)
  }
}
