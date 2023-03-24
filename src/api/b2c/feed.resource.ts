import type { OrderStatusUpdateElementListData, RequestData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class FeedResource extends RestClient {
  getEndpoint() {
    return `${this.basePath}/feeds`
  }

  /**
   * Returns the orders that have changed status.
   * Returns only the elements from the current baseSite that have been updated after the provided timestamp.
   * @param {Date | string} timestamp. Only items newer than the given parameter are retrieved. This parameter should be in RFC-8601 format.
   * @param {RequestData} queryParams
   */
  getOrderStatusUpdate(timestamp: Date | string, queryParams?: RequestData) {
    return this.get<OrderStatusUpdateElementListData>(`orders/statusfeed`, {
      params: {
        timestamp,
        ...queryParams
      }
    })
  }
}
