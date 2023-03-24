import { ProductEndpoint } from '@/api/b2c'
import type { CCPAttributeRequestData, CCPConfigurationData } from '@/api/models'

export class CcpProductResource extends ProductEndpoint {
  /**
   * Returns the default product configuration for a given complex product.
   * This means that a new instance of the configuration runtime
   * object is created that is equipped with the default values
   * from the configuration model. This API always returns the
   * entire group hierarchy, whereas it's capable of both
   * including all attributes or only those for the
   * first group. This is controlled by query
   * attribute provideAllAttributes
   * @param {string} productCode
   * @param {CCPAttributeRequestData} queryParams
   */
  getProductConfigForId(productCode: string, queryParams: CCPAttributeRequestData) {
    return this.get<CCPConfigurationData>(`${productCode}/configurators/ccpconfigurator`, { params: queryParams })
  }
}
