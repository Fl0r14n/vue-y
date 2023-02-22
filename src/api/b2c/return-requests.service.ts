import type {
  RequestData,
  ReturnRequestData,
  ReturnRequestEntryInputListData,
  ReturnRequestListData,
  ReturnRequestModificationData,
  SortableRequestData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class ReturnRequestsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orderReturns`
  }

  /**
   * Returns order return request data associated with a specified user for a specified base store.
   * @param {SortableRequestData} queryParams
   */
  getOrderReturns(queryParams?: SortableRequestData) {
    return this.query<ReturnRequestListData>({ params: queryParams })
  }

  /**
   * Creates an order return request.
   * @param {ReturnRequestEntryInputListData} returnRequest
   * @param {RequestData} queryParams
   */
  addOrderReturn(returnRequest: ReturnRequestEntryInputListData, queryParams?: RequestData) {
    return this.post<ReturnRequestData>({}, { params: { ...queryParams, ...returnRequest } })
  }

  /**
   * Returns specific order return request details based on a specific return request code.
   * The response contains detailed order return request information.
   * @param {string} code
   * @param {RequestData} queryParams
   */
  getOrderReturn(code: string, queryParams?: RequestData) {
    return this.get<ReturnRequestData>(code, { params: queryParams })
  }

  /**
   * Updates the order return request.
   * Only cancellation of the request is supported by setting the attribute status to CANCELLING.
   * Cancellation of the return request cannot be reverted
   * @param {string} code
   * @param {ReturnRequestModificationData} returnRequest
   */
  setOrderReturn(code: string, returnRequest: ReturnRequestModificationData) {
    return this.patch<void>(code, returnRequest)
  }
}
