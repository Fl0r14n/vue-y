import type { OrderApprovalData, OrderApprovalDecisionData, OrderApprovalListData, RequestData, SortableRequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class OrderApprovalResource extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orderapprovals`
  }

  /**
   * Returns the list of orders the specified user is allowed to approve.
   * @param {SortableRequestData} queryParams
   */
  getOrderApprovals(queryParams?: SortableRequestData) {
    return this.query<OrderApprovalListData>({ params: queryParams })
  }

  /**
   * Returns specific order details based on a specific order code.
   * The response contains detailed order information.
   * @param {string} code
   * @param {RequestData} queryParams
   */
  getOrderApproval(code: string, queryParams?: RequestData) {
    return this.get<OrderApprovalData>(code, { params: queryParams })
  }

  /**
   * Makes a decision on the order approval that will trigger the next step in the approval workflow.
   * @param {string} code
   * @param {OrderApprovalDecisionData} orderApproval
   * @param {RequestData} queryParams
   */
  addOrderApproval(code: string, orderApproval: OrderApprovalDecisionData, queryParams?: RequestData) {
    return this.postAt<OrderApprovalDecisionData>(`${code}/decision`, orderApproval, { params: queryParams })
  }
}
