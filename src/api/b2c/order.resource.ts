import type {
  CancellationRequestEntryInputListData,
  OrderData,
  OrderHistoryListData,
  OrderStatus,
  OrderSubmitData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getOrderRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orders`))
}

export abstract class OrderBaseResource {
  getGuestOrder!: (guid: string, queryParams?: RequestData) => Promise<OrderData>
  getOrders!: (
    queryParams: {
      statuses?: OrderStatus
    } & SortableRequestData
  ) => Promise<OrderHistoryListData>
  placeOrder!: (orderSubmit: OrderSubmitData, queryParams?: RequestData) => Promise<OrderData>
  getOrder!: (code: string, queryParams?: RequestData) => Promise<OrderData>
  cancelOrder!: (code: string, entries: CancellationRequestEntryInputListData, queryParams?: RequestData) => Promise<void>
}

const orderBaseResource = (): OrderBaseResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(sitePath)
  const orderRest = getOrderRest()
  return {
    getGuestOrder: (guid: string, queryParams?: RequestData) => rest.get<OrderData>(`orders/${guid}`, { params: queryParams }),
    getOrders: (queryParams: { statuses?: OrderStatus } & SortableRequestData) =>
      orderRest.query<OrderHistoryListData>({ params: queryParams }),
    placeOrder: (orderSubmit: OrderSubmitData, queryParams?: RequestData) =>
      orderRest.post<OrderData>({}, { params: { ...queryParams, ...orderSubmit } }),
    getOrder: (code: string, queryParams?: RequestData) => orderRest.get<OrderData>(code, { params: queryParams }),
    cancelOrder: (code: string, entries: CancellationRequestEntryInputListData, queryParams?: RequestData) =>
      orderRest.postAt<void>(`${code}/cancellation`, entries, { params: queryParams })
  }
}

export const useOrderBaseResource = () => inject(OrderBaseResource, orderBaseResource())
