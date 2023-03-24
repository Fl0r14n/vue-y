import type { ProductFutureStocksData, ProductFutureStocksListData, RequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class FutureStockResource extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/futureStocks/`
  }

  /**
   * Returns a list of product codes with a list of future product availability.
   * @param {string[]} productCodes
   * @param {RequestData} queryParams
   */
  getFutureStocks(productCodes: string[], queryParams?: RequestData) {
    return this.query<ProductFutureStocksListData>({
      params: {
        productCodes,
        ...queryParams
      }
    })
  }

  /**
   * Returns a list of future product availability of the specified product.
   * @param {string} productCode
   * @param {RequestData} queryParams
   */
  getFutureStocksForProduct(productCode: string, queryParams?: RequestData) {
    return this.get<ProductFutureStocksData>(`${productCode}`, { params: queryParams })
  }
}
