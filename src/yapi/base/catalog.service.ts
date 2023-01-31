import type {
  CatalogData,
  CatalogListData,
  CatalogVersionData,
  CategoryHierarchyData,
  PageableRequestData,
  RequestData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class CatalogService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/catalogs`
  }

  /**
   * Returns all catalogs with versions defined for the base store.
   * @param {RequestData} queryParams
   */
  getCatalogs(queryParams?: RequestData) {
    return this.query<CatalogListData>({ params: queryParams })
  }

  /**
   * Returns an information about a catalog based on its ID, along with versions defined for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {RequestData} queryParams
   */
  getCatalog(catalogId: string, queryParams?: RequestData) {
    return this.get<CatalogData>(catalogId, { params: queryParams })
  }

  /**
   * Returns information about catalog version that exists for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @param {RequestData} queryParams
   */
  getCatalogVersion(catalogId: string, catalogVersionId: string, queryParams?: RequestData) {
    return this.get<CatalogVersionData>(`${catalogId}/${catalogVersionId}`, { params: queryParams })
  }

  /**
   * Returns information about category that exists in a catalog version available for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @param {string} categoryId. Category identifier
   * @param {PageableRequestData} queryParams
   */
  getCategoryHierarchy(catalogId: string, catalogVersionId: string, categoryId: string, queryParams?: PageableRequestData) {
    return this.get<CategoryHierarchyData>(`${catalogId}/${catalogVersionId}/categories/${categoryId}`, { params: queryParams })
  }
}
