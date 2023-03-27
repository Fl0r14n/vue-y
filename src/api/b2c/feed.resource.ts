import type { OrderStatusUpdateElementListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class FeedResource {
  getOrderStatusUpdate!: (timestamp: Date | string, queryParams?: RequestData) => Promise<OrderStatusUpdateElementListData>
}

const feedResource = (): FeedResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/export`))
  return {
    getOrderStatusUpdate: (timestamp: Date | string, queryParams?: RequestData) =>
      rest.get<OrderStatusUpdateElementListData>(`orders/statusfeed`, {
        params: {
          timestamp,
          ...queryParams
        }
      })
  }
}

export const useFeedResource = () => inject(FeedResource, feedResource())
