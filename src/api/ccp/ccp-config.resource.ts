import type { CCPAttributeRequestData, CCPConfigurationData, CCPConfigurationOverviewData, CCPConfigurationPricingData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getCcpRest = () => {
  const { sitePath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/ccpconfigurator`))
}

export abstract class CcpConfigResource {
  getProductConfig!: (configId: string, queryParams: CCPAttributeRequestData) => Promise<CCPConfigurationData>
  setProductConfig!: (configId: string, body: CCPConfigurationData) => Promise<CCPConfigurationData>
  getConfigOverview!: (configId: string) => Promise<CCPConfigurationOverviewData>
  getPriceConfig!: (configId: string, queryParams: CCPAttributeRequestData) => Promise<CCPConfigurationPricingData>
}

const ccpConfigResource = (): CcpConfigResource => {
  const rest = getCcpRest()
  return {
    getProductConfig: (configId: string, queryParams: CCPAttributeRequestData) =>
      rest.get<CCPConfigurationData>(`${configId}`, { params: queryParams }),
    setProductConfig: (configId: string, body: CCPConfigurationData) => rest.postAt<CCPConfigurationData>(`${configId}`, body),
    getConfigOverview: (configId: string) => rest.get<CCPConfigurationOverviewData>(`${configId}/configurationOverview`),
    getPriceConfig: (configId: string, queryParams: CCPAttributeRequestData) =>
      rest.get<CCPConfigurationPricingData>(`${configId}/pricing`, { params: queryParams })
  }
}

export const useCcpConfigResource = () => inject(CcpConfigResource, ccpConfigResource())
