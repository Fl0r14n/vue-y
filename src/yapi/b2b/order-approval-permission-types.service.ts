import type { OrderApprovalPermissionTypeListData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class OrderApprovalPermissionTypesService extends RestClient {
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
