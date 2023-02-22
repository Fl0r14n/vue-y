import type {
  OrderHistoryListData,
  ReplenishmentOrderData,
  ReplenishmentOrderListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class ReplenishmentService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/replenishmentOrders`
  }

  /**
   * Returns the list of replenishment orders accessible to a specified user.
   * @param {SortableRequestData} queryParams
   */
  getReplenishmentOrders(queryParams?: SortableRequestData) {
    return this.query<ReplenishmentOrderListData>({ params: queryParams })
  }

  /**
   * Returns specific replenishment order details accessible for a specified user.
   * The response contains detailed orders information from the replenishment order.
   * @param {string} replenishmentOrderCode
   * @param {RequestData} queryParams
   */
  getReplenishmentOrder(replenishmentOrderCode: string, queryParams?: RequestData) {
    return this.get<ReplenishmentOrderData>(replenishmentOrderCode, { params: queryParams })
  }

  /**
   * Updates the replenishment order. Only cancellation of the replenishment order is supported by setting the attribute ‘active’ to FALSE.
   * Cancellation of the replenishment order cannot be reverted.
   * @param {string} replenishmentOrderCode
   * @param {RequestData} queryParams
   */
  setReplenishmentOrder(replenishmentOrderCode: string, queryParams?: RequestData) {
    return this.patch<ReplenishmentOrderData>(replenishmentOrderCode, null, { params: queryParams })
  }

  /**
   * Returns order history data from a replenishment order placed by a specified user.
   * @param {string} replenishmentOrderCode
   * @param {SortableRequestData} queryParams
   */
  getReplenishmentOrderHistory(replenishmentOrderCode: string, queryParams?: SortableRequestData) {
    return this.get<OrderHistoryListData>(`${replenishmentOrderCode}/orders`, { params: queryParams })
  }
}
