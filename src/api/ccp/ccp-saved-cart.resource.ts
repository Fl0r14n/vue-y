import { getCartRest } from '@/api/b2c'
import type { CCPConfigurationOverviewData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpSavedCartResource {
  getConfigOverviewForCartEntry!: (cartId: string, entryNumber: string) => Promise<CCPConfigurationOverviewData>
}

const ccpSavedCartResource = (): CcpSavedCartResource => {
  const rest = getCartRest()
  return {
    getConfigOverviewForCartEntry: (cartId = 'current', entryNumber: string) =>
      rest.get<CCPConfigurationOverviewData>(`${cartId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}

export const useCcpSavedCartResource = () => inject(CcpSavedCartResource, ccpSavedCartResource())
