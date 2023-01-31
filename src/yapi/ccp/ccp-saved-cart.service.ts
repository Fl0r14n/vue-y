import { CartEndpoint } from '@/yapi/b2c'
import type { CCPConfigurationOverviewData } from '@/yapi/models'

export class CcpSavedCartService extends CartEndpoint {
  /**
   * Gets a configuration overview, a simplified, condensed read-only
   * view on the product configuration of a saved cart entry.
   * Only the selected attribute values are present here
   * @param {string} cartId
   * @param {string} entryNumber
   */
  getConfigOverviewForCartEntry(cartId = 'current', entryNumber: string) {
    return this.get<CCPConfigurationOverviewData>(`${cartId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}
