import type { OrderApprovalPermissionData, OrderApprovalPermissionListData, RequestData, SortableRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrderApprovalPermissionsResource {
  getOrderApprovalPermissions!: (queryParams?: SortableRequestData) => Promise<OrderApprovalPermissionListData>
  addOrderApprovalPermission!: (
    orderApprovalPermission: OrderApprovalPermissionData,
    queryParams?: RequestData
  ) => Promise<OrderApprovalPermissionData>
  getOrderApprovalPermission!: (code: string, queryParams?: RequestData) => Promise<OrderApprovalPermissionListData>
  setOrderApprovalPermission!: (
    code: string,
    orderApprovalPermission: OrderApprovalPermissionData,
    queryParams?: RequestData
  ) => Promise<OrderApprovalPermissionData>
}

const orderApprovalPermissionsResource = (): OrderApprovalPermissionsResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orderApprovalPermissions`))
  return {
    getOrderApprovalPermissions: (queryParams?: SortableRequestData) =>
      rest.query<OrderApprovalPermissionListData>({ params: queryParams }),
    addOrderApprovalPermission: (orderApprovalPermission: OrderApprovalPermissionData, queryParams?: RequestData) =>
      rest.post<OrderApprovalPermissionData>(orderApprovalPermission, { params: queryParams }),
    getOrderApprovalPermission: (code: string, queryParams?: RequestData) =>
      rest.get<OrderApprovalPermissionData>(code, { params: queryParams }),
    setOrderApprovalPermission: (code: string, orderApprovalPermission: OrderApprovalPermissionData, queryParams?: RequestData) =>
      rest.patch<OrderApprovalPermissionData>(code, orderApprovalPermission, { params: queryParams })
  }
}

export const useOrderApprovalPermissionsResource = () => inject(OrderApprovalPermissionsResource, orderApprovalPermissionsResource())
