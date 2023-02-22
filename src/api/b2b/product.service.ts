import { ProductBaseService } from '@/api/b2c'
import type { ProductData, RequestData } from '@/api/models'
import type { RequestOptions } from '@/api/rest'

export class ProductService extends ProductBaseService {
  override getEndpoint(options?: RequestOptions) {
    return options?.['isOrg'] ? `${this.basePath}/${this.orgPrefix('products')}` : super.getEndpoint()
  }

  /**
   * Returns a product, based on the specified product code.
   * @param {string} productCode. Product identifier
   * @param {RequestData} queryParams
   */
  override getProduct(productCode: string, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.get<ProductData>(productCode, {
          params: queryParams,
          isOrg: true
        })) ||
      super.getProduct(productCode, queryParams)
    )
  }
}
