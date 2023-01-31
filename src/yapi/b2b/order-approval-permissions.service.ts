import type { OrderApprovalPermissionData, OrderApprovalPermissionListData, RequestData, SortableRequestData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class OrderApprovalPermissionsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orderApprovalPermissions`
  }

  /**
   * Returns the list of order approval permissions for the company of the identified user.
   * The response can display the results across multiple pages, if required.
   * @param {SortableRequestData} queryParams
   */
  getOrderApprovalPermissions(queryParams?: SortableRequestData) {
    return this.query<OrderApprovalPermissionListData>({ params: queryParams })
  }

  /**
   * Creates a new order approval permission.
   * @param {OrderApprovalPermissionData} orderApprovalPermission
   * @param {RequestData} queryParams
   */
  addOrderApprovalPermission(orderApprovalPermission: OrderApprovalPermissionData, queryParams?: RequestData) {
    return this.post<OrderApprovalPermissionData>(orderApprovalPermission, { params: queryParams })
  }

  /**
   * Returns a specific order approval permission based on specific code.
   * The response contains detailed order approval permission information.
   * @param {string} code
   * @param {RequestData} queryParams
   */
  getOrderApprovalPermission(code: string, queryParams?: RequestData) {
    return this.get<OrderApprovalPermissionData>(code, { params: queryParams })
  }

  /**
   * Updates the order approval permission. Only attributes provided in the request body will be changed.
   * @param {string} code
   * @param {OrderApprovalPermissionData} orderApprovalPermission
   * @param {RequestData} queryParams
   */
  setOrderApprovalPermission(code: string, orderApprovalPermission: OrderApprovalPermissionData, queryParams?: RequestData) {
    return this.patch<OrderApprovalPermissionData>(code, orderApprovalPermission, { params: queryParams })
  }
}
