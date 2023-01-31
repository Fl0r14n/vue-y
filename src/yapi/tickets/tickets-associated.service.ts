import type { RequestData, TicketAssociatedObjectListData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class TicketsAssociatedService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/ticketAssociatedObjects`
  }

  /**
   * Returns order and cart objects that can be associated with a ticket for the current user.
   * @param {RequestData} queryParams
   */
  getTicketAssociations(queryParams?: RequestData) {
    return this.query<TicketAssociatedObjectListData>({ params: queryParams })
  }
}
