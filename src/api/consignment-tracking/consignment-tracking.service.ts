import type { ConsignmentTrackingData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class ConsignmentTrackingResource {
  getOrderConsignmentStatus?: (orderCode: string, consignmentCode: string) => Promise<ConsignmentTrackingData>
}

const consignmentTrackingResource = (): ConsignmentTrackingResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orders`))

  return {
    getOrderConsignmentStatus: (orderCode: string, consignmentCode: string) =>
      rest.get<ConsignmentTrackingData>(`${orderCode}/consignments/${consignmentCode}/tracking`)
  }
}

export const useConsignmentTrackingResource = () => inject(ConsignmentTrackingResource, consignmentTrackingResource())
