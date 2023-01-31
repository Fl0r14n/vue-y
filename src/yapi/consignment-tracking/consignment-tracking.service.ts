import type { ConsignmentTrackingData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class ConsignmentTrackingService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orders/`
  }

  /**
   * Returns details of consignment tracking information based on the order code and the consignment code.
   * @param {string} orderCode
   * @param {ConsignmentTrackingData} consignmentCode
   */
  getOrderConsignmentStatus(orderCode: string, consignmentCode: string) {
    return this.get<ConsignmentTrackingData>(`${orderCode}/consignments/${consignmentCode}/tracking`)
  }
}
