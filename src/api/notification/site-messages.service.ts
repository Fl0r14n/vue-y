import type { SiteMessageSearchPageData, WithTotalRequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class SiteMessagesService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/notifications/sitemessages`
  }

  /**
   * Returns the site messages of current customer.
   * @param {WithTotalRequestData} queryParams
   */
  getSiteMessages(queryParams?: WithTotalRequestData) {
    return this.query<SiteMessageSearchPageData>({ params: queryParams })
  }
}
