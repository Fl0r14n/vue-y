import type { RequestData, SortableRequestData, TicketData, TicketEventData, TicketListData, TicketStarterData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class TicketsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/tickets`
  }

  /**
   * Get all tickets for user
   * @param {SortableRequestData} queryParams
   */
  getTickets(queryParams?: SortableRequestData) {
    return this.query<TicketListData>({ params: queryParams })
  }

  /**
   * Create a ticket
   * @param {RequestData} queryParams
   * @param {TicketStarterData} body
   */
  addTicket(body?: TicketStarterData, queryParams?: RequestData) {
    return this.post<TicketData>(body, { params: queryParams })
  }

  /**
   * Get a Ticket by id
   * @param {RequestData} queryParams
   * @param {string} ticketId
   */
  getTicket(ticketId: string, queryParams?: RequestData) {
    return this.get<TicketData>(`${ticketId}`, { params: queryParams })
  }

  /**
   * Creates a new ticket event.
   * @param {RequestData} queryParams
   * @param {TicketEventData} body
   * @param {string} ticketId
   */
  addTicketEvent(ticketId: string, body?: TicketEventData, queryParams?: RequestData) {
    return this.postAt<void>(`${ticketId}/events`, body, { params: queryParams })
  }
}
