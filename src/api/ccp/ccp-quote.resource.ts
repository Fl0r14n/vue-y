import { getQuoteRest } from '@/api/b2b'
import type { CCPConfigurationOverviewData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpQuoteResource {
  getConfigOverviewForQuoteEntry!: (quoteId: string, entryNumber: string) => Promise<CCPConfigurationOverviewData>
}

const ccpQuoteResource = (): CcpQuoteResource => {
  const rest = getQuoteRest()
  return {
    getConfigOverviewForQuoteEntry: (quoteId: string, entryNumber: string) =>
      rest.get<CCPConfigurationOverviewData>(`${quoteId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}

export const useCcpQuoteResource = () => inject(CcpQuoteResource, ccpQuoteResource())
