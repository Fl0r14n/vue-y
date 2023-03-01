import { inject, provide } from '@/api'
import type { CMSPageData, CmsPageRequestData, ListAdaptedPagesData, PageType, RequestData, SortableRequestData } from '@/api/models'
import { useRestClient } from '@/api/rest'

export abstract class PageResource {
  getPages!: (queryParams?: CmsPageRequestData) => Promise<CMSPageData>
  getPage!: (pageId: string, queryParams?: RequestData) => Promise<CMSPageData>
  getSitePages!: (
    queryParams?: {
      pageType?: PageType
    } & SortableRequestData
  ) => Promise<ListAdaptedPagesData>
}

const pageResource = (): PageResource => {
  const rest = useRestClient()
  rest.endpoint.value = `${rest.sitePath.value}/cms`
  return {
    getPages: (queryParams?: CmsPageRequestData) => rest.get<CMSPageData>(`pages`, { params: queryParams }),
    getPage: (pageId: string, queryParams?: RequestData) => rest.get<CMSPageData>(`pages/${pageId}`, { params: queryParams }),
    getSitePages: (
      queryParams?: {
        pageType?: PageType
      } & SortableRequestData
    ) => rest.get<ListAdaptedPagesData>(`sitepages`, { params: queryParams })
  }
}

provide(PageResource, pageResource())

export const usePageResource = () => inject<PageResource>(PageResource)
