import { getOrderRest } from '@/api/b2c'
import type { CCPConfigurationOverviewData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpOrderResource {
  getConfigOverviewForOrderEntry!: (orderId: string, entryNumber: string) => Promise<CCPConfigurationOverviewData>
}

const ccpOrderResource = (): CcpOrderResource => {
  const rest = getOrderRest()
  return {
    getConfigOverviewForOrderEntry: (orderId: string, entryNumber: string) =>
      rest.get<CCPConfigurationOverviewData>(`${orderId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}

export const useCcpOrderResource = () => inject(CcpOrderResource, ccpOrderResource())
