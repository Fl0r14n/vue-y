import type { PageableRequestData, ProductListData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class ExportService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/export`
  }

  /**
   * Used for product export.
   * Depending on the timestamp parameter, it can return all products or only products modified after the given time.
   * @param {{catalog?: string; version?: string; timestamp?: Date} & PageableRequestData} queryParams
   */
  getProducts(
    queryParams?: {
      /**
       * Catalog from which get products. Must be provided along with version.
       */
      catalog?: string
      /**
       * Catalog version. Must be provided along with catalog.
       */
      version?: string
      /**
       * When this parameter is set, only products modified after given time will be returned.
       * This parameter should be in RFC-8601 format.
       */
      timestamp?: Date
    } & PageableRequestData
  ) {
    return this.get<ProductListData>(`products`, { params: queryParams })
  }
}
