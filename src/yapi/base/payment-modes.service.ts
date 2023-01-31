import type { PaymentModeListData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

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
