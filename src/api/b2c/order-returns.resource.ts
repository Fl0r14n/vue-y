import type {
  RequestData,
  ReturnRequestData,
  ReturnRequestEntryInputListData,
  ReturnRequestListData,
  ReturnRequestModificationData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getOrderReturnsRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orderReturns`))
}

export abstract class OrderReturnsResource {
  getOrderReturns!: (queryParams?: SortableRequestData) => Promise<ReturnRequestListData>
  addOrderReturn!: (returnRequest: ReturnRequestEntryInputListData, queryParams?: RequestData) => Promise<ReturnRequestData>
  getOrderReturn!: (code: string, queryParams?: RequestData) => Promise<ReturnRequestData>
  setOrderReturn!: (code: string, returnRequest: ReturnRequestModificationData) => Promise<void>
}

const orderReturnsResource = (): OrderReturnsResource => {
  const rest = getOrderReturnsRest()
  return {
    getOrderReturns: (queryParams?: SortableRequestData) => rest.query<ReturnRequestListData>({ params: queryParams }),
    addOrderReturn: (returnRequest: ReturnRequestEntryInputListData, queryParams?: RequestData) =>
      rest.post<ReturnRequestData>({}, { params: { ...queryParams, ...returnRequest } }),
    getOrderReturn: (code: string, queryParams?: RequestData) => rest.get<ReturnRequestData>(code, { params: queryParams }),
    setOrderReturn: (code: string, returnRequest: ReturnRequestModificationData) => rest.patch<void>(code, returnRequest)
  }
}

export const useOrderReturnsResource = () => inject(OrderReturnsResource, orderReturnsResource())
