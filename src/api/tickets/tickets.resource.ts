import type { RequestData, SortableRequestData, TicketData, TicketEventData, TicketListData, TicketStarterData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class TicketsResource {
  getTickets?: (queryParams?: SortableRequestData) => Promise<TicketListData>
  addTicket?: (body?: TicketStarterData, queryParams?: RequestData) => Promise<TicketData>
  getTicket?: (ticketId: string, queryParams?: RequestData) => Promise<TicketData>
  addTicketEvent?: (ticketId: string, body?: TicketEventData, queryParams?: RequestData) => Promise<void>
}

const ticketsResource = (): TicketsResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath}/tickets`))
  return {
    getTickets: (queryParams?: SortableRequestData) => rest.query<TicketListData>({ params: queryParams }),
    addTicket: (body?: TicketStarterData, queryParams?: RequestData) => rest.post<TicketData>(body, { params: queryParams }),
    getTicket: (ticketId: string, queryParams?: RequestData) => rest.get<TicketData>(`${ticketId}`, { params: queryParams }),
    addTicketEvent: (ticketId: string, body?: TicketEventData, queryParams?: RequestData) =>
      rest.postAt<void>(`${ticketId}/events`, body, { params: queryParams })
  }
}

export const useTicketsResource = () => inject(TicketsResource, ticketsResource())
