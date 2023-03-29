import type {
  OrderHistoryListData,
  ReplenishmentOrderData,
  ReplenishmentOrderListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getReplenishmentRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/replenishmentOrders`))
}

export abstract class ReplenishmentResource {
  getReplenishmentOrders!: (queryParams?: SortableRequestData) => Promise<ReplenishmentOrderListData>
  getReplenishmentOrder!: (replenishmentOrderCode: string, queryParams?: RequestData) => Promise<ReplenishmentOrderData>
  setReplenishmentOrder!: (replenishmentOrderCode: string, queryParams?: RequestData) => Promise<ReplenishmentOrderData>
  getReplenishmentOrderHistory!: (replenishmentOrderCode: string, queryParams?: SortableRequestData) => Promise<OrderHistoryListData>
}

const replenishmentResource = (): ReplenishmentResource => {
  const rest = getReplenishmentRest()
  return {
    getReplenishmentOrders: (queryParams?: SortableRequestData) => rest.query<ReplenishmentOrderListData>({ params: queryParams }),
    getReplenishmentOrder: (replenishmentOrderCode: string, queryParams?: RequestData) =>
      rest.get<ReplenishmentOrderData>(replenishmentOrderCode, { params: queryParams }),
    setReplenishmentOrder: (replenishmentOrderCode: string, queryParams?: RequestData) =>
      rest.patch<ReplenishmentOrderData>(replenishmentOrderCode, null, { params: queryParams }),
    getReplenishmentOrderHistory: (replenishmentOrderCode: string, queryParams?: SortableRequestData) =>
      rest.get<OrderHistoryListData>(`${replenishmentOrderCode}/orders`, { params: queryParams })
  }
}

export const useReplenishmentResource = () => inject(ReplenishmentResource, replenishmentResource())
