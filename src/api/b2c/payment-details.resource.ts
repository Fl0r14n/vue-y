import type { PaymentDetailsData, PaymentDetailsListData, RequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class PaymentDetailsResource extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/paymentdetails`
  }

  /**
   * Return customer's credit card payment details list.
   * @param {{saved?: boolean} & RequestData} queryParams
   */
  getPaymentDetails(
    queryParams?: {
      /**
       * Type of payment details
       */
      saved?: boolean
    } & RequestData
  ) {
    return this.query<PaymentDetailsListData>({ params: queryParams })
  }

  /**
   * Returns customer's credit card payment details for a given id.
   * @param {string} paymentDetailsId
   * @param {RequestData} queryParams
   */
  getPaymentDetail(paymentDetailsId: string, queryParams?: RequestData) {
    return this.get<PaymentDetailsData>(paymentDetailsId, { params: queryParams })
  }

  /**
   * Updates existing customer's credit card payment details based on its ID.
   * Only attributes given in request will be changed.
   * @param {string} paymentDetailsId
   * @param {PaymentDetailsData} paymentDetail
   * @param {RequestData} queryParams
   */
  setPaymentDetail(paymentDetailsId: string, paymentDetail: PaymentDetailsData, queryParams?: RequestData) {
    return this.patch<void>(paymentDetailsId, paymentDetail, { params: queryParams })
  }

  /**
   * Removes customer's credit card payment details based on its ID.
   * @param {string} paymentDetailsId
   */
  delPaymentDetail(paymentDetailsId: string) {
    return this.delete<void>(paymentDetailsId)
  }
}
