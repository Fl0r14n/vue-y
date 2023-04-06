import type { RequestData, TicketAssociatedObjectListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class TicketAssociatedResource {
  getTicketAssociations!: (queryParams?: RequestData) => Promise<TicketAssociatedObjectListData>
}

const ticketAssociatedResource = (): TicketAssociatedResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath}/ticketAssociatedObjects`))
  return {
    getTicketAssociations: (queryParams?: RequestData) => rest.query<TicketAssociatedObjectListData>({ params: queryParams })
  }
}

export const useTicketAssociatedResource = () => inject(TicketAssociatedResource, ticketAssociatedResource())
