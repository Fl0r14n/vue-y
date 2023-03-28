import type { OrderApprovalPermissionTypeListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrderApprovalPermissionTypesResource {
  getOrderApprovalPermissionTypes!: (queryParams?: RequestData) => Promise<OrderApprovalPermissionTypeListData>
}

const orderApprovalPermissionTypesResource = (): OrderApprovalPermissionTypesResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/orderApprovalPermissionTypes`))
  return {
    getOrderApprovalPermissionTypes: (queryParams?: RequestData) => rest.query<OrderApprovalPermissionTypeListData>({ params: queryParams })
  }
}

export const useOrderApprovalPermissionTypesResource = () =>
  inject(OrderApprovalPermissionTypesResource, orderApprovalPermissionTypesResource())
