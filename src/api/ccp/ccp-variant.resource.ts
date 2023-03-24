import { CcpEndpoint } from '@/api/ccp/ccp-config.resource'
import type { CCPConfigurationProductVariantData } from '@/api/models'

export class CcpVariantResource extends CcpEndpoint {
  /**
   * Gets variants that match the current configuration attributes
   * @param {string} configId
   */
  getVariantsForConfiguration(configId?: string) {
    return this.get<CCPConfigurationProductVariantData[]>(`${configId}/variants`)
  }
}
