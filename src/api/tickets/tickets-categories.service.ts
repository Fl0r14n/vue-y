import type { RequestData, TicketCategoryListData } from '@/api/models'
import { RestClient } from '@/api/rest'

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
