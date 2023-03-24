import type { OrderApprovalPermissionTypeListData, RequestData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class OrderApprovalPermissionTypesResource extends RestClient {
  getEndpoint() {
    return `${this.basePath}/orderApprovalPermissionTypes`
  }

  /**
   * Returns the list of order approval permission types.
   * @param {RequestData} queryParams
   */
  getOrderApprovalPermissionTypes(queryParams?: RequestData) {
    return this.query<OrderApprovalPermissionTypeListData>({ params: queryParams })
  }
}
