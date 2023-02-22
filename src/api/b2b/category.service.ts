import type { ProductSearchPageData, QueryRequestData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class CategoryService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/categories`
  }

  /**
   * Returns a list of products in the specified category.
   * @param {string} categoryId
   * @param {QueryRequestData} queryParams
   */
  getProductsByCategory(categoryId: string, queryParams?: QueryRequestData) {
    return this.get<ProductSearchPageData>(`${categoryId}/products`, { params: queryParams })
  }
}
