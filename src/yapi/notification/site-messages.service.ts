import type { SiteMessageSearchPageData, WithTotalRequestData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

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
