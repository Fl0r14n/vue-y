import { getCcpRest } from '@/api/ccp/ccp-config.resource'
import type { CCPConfigurationProductVariantData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpVariantResource {
  getVariantsForConfiguration!: (configId?: string) => Promise<CCPConfigurationProductVariantData[]>
}

const ccpVariantResource = (): CcpVariantResource => {
  const rest = getCcpRest()
  return {
    getVariantsForConfiguration: (configId?: string) => rest.get<CCPConfigurationProductVariantData[]>(`${configId}/variants`)
  }
}

export const useCcpVariantResource = () => inject(CcpVariantResource, ccpVariantResource())
