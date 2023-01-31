import type { CMSPageData, ListAdaptedPagesData, PageType, RequestData, SortableRequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class PageService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/cms`
  }

  /**
   * Given a page identifier, return the page data with a list of cms content slots, each of which contains a list of cms component data.
   * @param {{code?: string; pageLabelOrId?: string; pageType?: PageType; cmsTicketId?: string} & RequestData} queryParams
   */
  getPages(
    queryParams?: {
      /**
       * If pageType is ProductPage, code should be product code;
       * if pageType is CategoryPage, code should be category code;
       * if pageType is CatalogPage, code should be catalog code
       */
      code?: string
      /**
       * Page Label or Id
       */
      pageLabelOrId?: string
      pageType?: PageType
      cmsTicketId?: string
    } & RequestData
  ) {
    return this.get<CMSPageData>(`pages`, { params: queryParams })
  }

  /**
   * Given a page identifier, return the page data with a list of cms content slots, each of which contains a list of cms component data.
   * @param {string} pageId
   * @param {RequestData} queryParams
   */
  getPage(pageId: string, queryParams?: RequestData) {
    return this.get<CMSPageData>(`pages/${pageId}`, { params: queryParams })
  }

  /**
   * Get a list page data with pagination support.
   * @param {{pageType?: PageType} & SortableRequestData} queryParams
   */
  getSitePages(
    queryParams?: {
      /**
       * Available values : ContentPage, ProductPage, CategoryPage, CatalogPage
       */
      pageType?: PageType
    } & SortableRequestData
  ) {
    return this.get<ListAdaptedPagesData>(`sitepages`, { params: queryParams })
  }
}
