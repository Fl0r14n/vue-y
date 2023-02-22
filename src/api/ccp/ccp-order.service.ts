import { OrderEndpoint } from '@/api/b2c'
import type { CCPConfigurationOverviewData } from '@/api/models'

export class CcpOrderService extends OrderEndpoint {
  /**
   * Gets a configuration overview, a simplified, condensed read-only
   * view on the product configuration of an order entry.
   * Only the selected attribute values are present here
   * @param {string} orderId
   * @param {string} entryNumber
   */
  getConfigOverviewForOrderEntry(orderId: string, entryNumber: string) {
    return this.get<CCPConfigurationOverviewData>(`${orderId}/entries/${entryNumber}/ccpconfigurator/configurationOverview`)
  }
}
