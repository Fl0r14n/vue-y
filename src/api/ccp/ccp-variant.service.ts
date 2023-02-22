import { CcpEndpoint } from '@/api/ccp/ccp-config.service'
import type { CCPConfigurationProductVariantData } from '@/api/models'

export class CcpVariantService extends CcpEndpoint {
  /**
   * Gets variants that match the current configuration attributes
   * @param {string} configId
   */
  getVariantsForConfiguration(configId?: string) {
    return this.get<CCPConfigurationProductVariantData[]>(`${configId}/variants`)
  }
}
