import type {
  CancellationRequestEntryInputListData,
  OrderData,
  OrderHistoryListData,
  OrderStatus,
  OrderSubmitData,
  RequestData,
  SortableRequestData
} from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export abstract class OrderEndpoint extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orders/`
  }
}

export class OrderBaseService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}`
  }

  /**
   * Returns details of a specific order based on order GUID (Globally Unique Identifier) or order CODE.<br/>
   * The response contains a detailed order information.
   * @param {string} guid Order GUID (Globally Unique Identifier) or order CODE
   * @param {RequestData} queryParams
   */
  getGuestOrder(guid: string, queryParams?: RequestData) {
    return this.get<OrderData>(`orders/${guid}`, { params: queryParams })
  }

  /**
   * Returns order history data for all orders placed by the specific user for the specific base store.<br/>
   * Response contains orders search result displayed in several pages if needed.
   * @param {{statuses?: OrderStatus} & SortableRequestData} queryParams
   */
  getOrders(
    queryParams: {
      /**
       * Filters only certain order statuses.
       * It means: statuses=CANCELLED,CHECKED_VALID would only return orders with status CANCELLED or CHECKED_VALID.
       */
      statuses?: OrderStatus
    } & SortableRequestData
  ) {
    return this.get<OrderHistoryListData>(`users/${this.userPath}/orders`, { params: queryParams })
  }

  /**
   * Authorizes cart and places the order. Response contains the new order data.
   * @param {OrderSubmitData} orderSubmit
   * @param {RequestData} queryParams
   */
  placeOrder(orderSubmit: OrderSubmitData, queryParams?: RequestData) {
    return this.postAt<OrderData>(`users/${this.userPath}/orders`, {}, { params: { ...queryParams, ...orderSubmit } })
  }

  /**
   * Returns specific order details based on a specific order code. The response contains detailed order information.
   * @param {string} code
   * @param {RequestData} queryParams
   */
  getOrder(code: string, queryParams?: RequestData) {
    return this.get<OrderData>(`users/${this.userPath}/orders/${code}`, { params: queryParams })
  }

  /**
   * Cancels an order partially or completely
   * @param {string} code
   * @param {CancellationRequestEntryInputListData} entries
   * @param {RequestData} queryParams
   */
  cancelOrder(code: string, entries: CancellationRequestEntryInputListData, queryParams?: RequestData) {
    return this.postAt<void>(`users/${this.userPath}/orders/${code}/cancellation`, entries, { params: queryParams })
  }
}
