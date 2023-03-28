import { getProductRest } from '@/api/b2c'
import type { CCPAttributeRequestData, CCPConfigurationData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpProductResource {
  getProductConfigForId!: (productCode: string, queryParams: CCPAttributeRequestData) => Promise<CCPConfigurationData>
}

const ccpProductResource = (): CcpProductResource => {
  const rest = getProductRest()
  return {
    getProductConfigForId: (productCode: string, queryParams: CCPAttributeRequestData) =>
      rest.get<CCPConfigurationData>(`${productCode}/configurators/ccpconfigurator`, { params: queryParams })
  }
}

export const useCcpProductResource = () => inject(CcpProductResource, ccpProductResource())
