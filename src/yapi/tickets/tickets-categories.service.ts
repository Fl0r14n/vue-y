import type { RequestData, TicketCategoryListData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class TicketsCategoriesService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/ticketCategories`
  }

  /**
   * Returns all tickets categories
   * @param {RequestData} queryParams
   */
  getTicketCategories(queryParams?: RequestData) {
    return this.query<TicketCategoryListData>({ params: queryParams })
  }
}
