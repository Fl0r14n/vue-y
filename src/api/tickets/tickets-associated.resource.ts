import type { RequestData, TicketAssociatedObjectListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class TicketsAssociatedResource {
  getTicketAssociations?: (queryParams?: RequestData) => Promise<TicketAssociatedObjectListData>
}

const ticketsAssociatedResource = (): TicketsAssociatedResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath}/ticketAssociatedObjects`))
  return {
    getTicketAssociations: (queryParams?: RequestData) => rest.query<TicketAssociatedObjectListData>({ params: queryParams })
  }
}

export const useTicketsAssociatedResource = () => inject(TicketsAssociatedResource, ticketsAssociatedResource())
