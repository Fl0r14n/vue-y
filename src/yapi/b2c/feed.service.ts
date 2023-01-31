import type { OrderStatusUpdateElementListData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class FeedService extends RestClient {
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
