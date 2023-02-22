import type { PaymentModeListData, RequestData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class PaymentModesService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/paymentmodes`
  }

  /**
   * Gets all payment modes defined for the base store.
   * @param {RequestData} queryParams
   */
  getPaymentModes(queryParams?: RequestData) {
    return this.query<PaymentModeListData>({ params: queryParams })
  }
}
