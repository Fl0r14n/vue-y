import { QuoteEndpoint } from '@/api/b2b'
import type { CCPConfigurationOverviewData } from '@/api/models'

export class CcpQuoteService extends QuoteEndpoint {
  /**
   * Gets a configuration overview, a simplified, condensed read-only
   * view on the product configuration of an quote entry.
   * Only the selected attribute values are present here
   * @param {string} quoteId
   * @param {string} entryNumber
   */
  getConfigOverviewForQuoteEntry(quoteId: string, entryNumber: string) {
    return this.get<CCPConfigurationOverviewData>(`${quoteId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}
