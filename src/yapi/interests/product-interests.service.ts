import type {
  CustomerInterestsSearchPageData,
  ProductInterestRelationData,
  ProductInterestRequestData,
  RequestData,
  WithTotalRequestData
} from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class ProductInterestsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}`
  }

  /**
   * Gets product interests for a user.
   * @param {ProductInterestRequestData & WithTotalRequestData} queryParams
   */
  getProductInterests(queryParams?: ProductInterestRequestData & WithTotalRequestData) {
    return this.get<CustomerInterestsSearchPageData>('productinterests', { params: queryParams })
  }

  /**
   * Sets product interests for a user.
   * @param {ProductInterestRequestData} interest
   * @param {RequestData} queryParams
   */
  addProductInterests(interest: ProductInterestRequestData, queryParams?: RequestData) {
    return this.postAt<ProductInterestRelationData>('productinterests', {}, { params: { ...queryParams, ...interest } })
  }

  /**
   * Removes product interests by product code and notification type.
   * @param {ProductInterestRequestData} interest
   */
  delProductInterests(interest: ProductInterestRequestData) {
    return this.delete<void>('productinterests', { params: interest })
  }
}
