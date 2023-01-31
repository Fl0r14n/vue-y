import type {
  CCPAttributeRequestData,
  CCPConfigurationData,
  CCPConfigurationOverviewData,
  CCPConfigurationPricingData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export abstract class CcpEndpoint extends RestClient {
  getEndpoint() {
    return `${this.basePath}/ccpconfigurator/`
  }
}

export class CcpConfigService extends CcpEndpoint {
  /**
   * Returns a product configuration, specified by its id. In case
   * this call is done in the context of a logged-in session,
   * the call ensures that the configuration is only
   * returned if the user is authorized to
   * view the configuration
   * @param {string} configId
   * @param {CCPAttributeRequestData} queryParams
   */
  getProductConfig(configId: string, queryParams: CCPAttributeRequestData) {
    return this.get<CCPConfigurationData>(`${configId}`, { params: queryParams })
  }

  /**
   *Updates a product configuration. It's possible to send only the changed
   * parts of the configuration, for example a single value change for an
   * attribute. These changes must include their entire path through
   * the configuration (the group they belong to and its parent groups)
   * @param {string} configId
   * @param {CCPConfigurationData} body
   */
  setProductConfig(configId: string, body: CCPConfigurationData) {
    return this.postAt<CCPConfigurationData>(`${configId}`, body)
  }

  /**
   * Gets a configuration overview, a simplified, condensed read-only
   * view on the product configuration. Only the selected
   * attribute values are present here
   * @param {string} configId
   */
  getConfigOverview(configId: string) {
    return this.get<CCPConfigurationOverviewData>(`${configId}/configurationOverview`)
  }

  /**
   * Gets price elements on configuration level and on attribute value
   * level if present. Those price elements include e.g.
   * the configuration base price and
   * the sum of selected options
   * @param {string} configId
   * @param {CCPAttributeRequestData} queryParams
   */
  getPriceConfig(configId: string, queryParams: CCPAttributeRequestData) {
    return this.get<CCPConfigurationPricingData>(`${configId}/pricing`, { params: queryParams })
  }
}
