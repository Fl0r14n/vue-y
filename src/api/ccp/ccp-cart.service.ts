import { CartEndpoint } from '@/api/b2c'
import type { CartModificationData, CCPConfigurationData, CCPOrderEntryData } from '@/api/models'

export class CcpCartService extends CartEndpoint {
  /**
   * Returns the configuration of a cart entry and ensures that the entry
   * can later be updated with the configuration and its changes
   * @param {string} cartId
   * @param {string} entryNumber
   */
  getConfigForCartEntry(cartId = 'current', entryNumber: string) {
    return this.get<CCPConfigurationData>(`${cartId}/entries/${entryNumber}/ccpconfigurator`)
  }

  /**
   * Updates the configuration. The entire configuration attached to the cart entry
   * is replaced by the configuration specified in the request body.
   * Possible only if the configuration change has been
   * initiated by the corresponding GET method before
   * @param {string} cartId
   * @param {string} entryNumber
   * @param {CCPOrderEntryData} entry
   */
  updateConfigForCartEntry(cartId = 'current', entryNumber: string, entry: CCPOrderEntryData) {
    return this.put<CartModificationData>(`${cartId}/entries/${entryNumber}/ccpconfigurator`, entry)
  }

  /**
   * Adds a product configuration to the cart. The root product of the configuration
   * is added as a cart entry,in addition the configuration
   * is attached to the new entry
   * @param {string} cartId
   * @param {CCPOrderEntryData} entry
   */
  addEntryWithConfigToCart(cartId = 'current', entry: CCPOrderEntryData) {
    return this.postAt<CartModificationData>(`${cartId}/entries/ccpconfigurator`, entry)
  }
}
