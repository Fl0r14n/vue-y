import type {
  CatalogData,
  CatalogListData,
  CatalogVersionData,
  CategoryHierarchyData,
  PageableRequestData,
  RequestData
} from '@/api/models'
import { useRestClient } from '@/api/rest'
import type { App } from 'vue'
import { inject } from 'vue'

export abstract class CatalogResource {
  getCatalogs!: (queryParams?: RequestData) => Promise<CatalogListData>
  getCatalog!: (catalogId: string, queryParams?: RequestData) => Promise<CatalogData>
  getCatalogVersion!: (catalogId: string, catalogVersionId: string, queryParams?: RequestData) => Promise<CatalogVersionData>
  getCategoryHierarchy!: (
    catalogId: string,
    catalogVersionId: string,
    categoryId: string,
    queryParams?: PageableRequestData
  ) => Promise<CategoryHierarchyData>
}

const catalogResource = (): CatalogResource => {
  const rest = useRestClient()
  rest.endpoint.value = `${rest.sitePath.value}/catalogs`
  return {
    getCatalogs: (queryParams?: RequestData) => rest.query<CatalogListData>({ params: queryParams }),
    getCatalog: (catalogId: string, queryParams?: RequestData) => rest.get<CatalogData>(catalogId, { params: queryParams }),
    getCatalogVersion: (catalogId: string, catalogVersionId: string, queryParams?: RequestData) =>
      rest.get<CatalogVersionData>(`${catalogId}/${catalogVersionId}`, { params: queryParams }),
    getCategoryHierarchy: (catalogId: string, catalogVersionId: string, categoryId: string, queryParams?: PageableRequestData) =>
      rest.get<CategoryHierarchyData>(`${catalogId}/${catalogVersionId}/categories/${categoryId}`, { params: queryParams })
  }
}

export const createCatalogResource = () => ({
  install(app: App) {
    app.provide(CatalogResource.name, catalogResource())
  }
})

export const useCatalogResource = () => inject<CatalogResource>(CatalogResource.name)!
