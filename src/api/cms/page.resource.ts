import type { CMSPageData, CmsPageRequestData, ListAdaptedPagesData, PageType, RequestData, SortableRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

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
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/cms`))
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

export const usePageResource = () => inject<PageResource>(PageResource, pageResource())
