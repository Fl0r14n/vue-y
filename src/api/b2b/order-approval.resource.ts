import type { OrderApprovalData, OrderApprovalDecisionData, OrderApprovalListData, RequestData, SortableRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrderApprovalResource {
  getOrderApprovals!: (queryParams?: SortableRequestData) => Promise<OrderApprovalListData>
  getOrderApproval!: (code: string, queryParams?: RequestData) => Promise<OrderApprovalData>
  addOrderApproval!: (
    code: string,
    orderApproval: OrderApprovalDecisionData,
    queryParams?: RequestData
  ) => Promise<OrderApprovalDecisionData>
}

const orderApprovalResource = (): OrderApprovalResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orderapprovals`))
  return {
    getOrderApprovals: (queryParams?: SortableRequestData) => rest.query<OrderApprovalListData>({ params: queryParams }),
    getOrderApproval: (code: string, queryParams?: RequestData) => rest.get<OrderApprovalData>(code, { params: queryParams }),
    addOrderApproval: (code: string, orderApproval: OrderApprovalDecisionData, queryParams?: RequestData) =>
      rest.postAt<OrderApprovalDecisionData>(`${code}/decision`, orderApproval, { params: queryParams })
  }
}

export const getOrderApprovalResource = () => inject(OrderApprovalResource, orderApprovalResource())
