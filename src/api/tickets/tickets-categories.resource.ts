import type { RequestData, TicketCategoryListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class TicketsCategoriesResource {
  getTicketCategories?: (queryParams?: RequestData) => Promise<TicketCategoryListData>
}

const ticketsCategoriesResource = (): TicketsCategoriesResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/ticketCategories`))
  return {
    getTicketCategories: (queryParams?: RequestData) => rest.query<TicketCategoryListData>({ params: queryParams })
  }
}

export const useTicketsCategoriesResource = () => inject(TicketsCategoriesResource, ticketsCategoriesResource())
