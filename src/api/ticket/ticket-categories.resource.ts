import type { RequestData, TicketCategoryListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class TicketCategoriesResource {
  getTicketCategories!: (queryParams?: RequestData) => Promise<TicketCategoryListData>
}

const ticketCategoriesResource = (): TicketCategoriesResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/ticketCategories`))
  return {
    getTicketCategories: (queryParams?: RequestData) => rest.query<TicketCategoryListData>({ params: queryParams })
  }
}

export const useTicketCategoriesResource = () => inject(TicketCategoriesResource, ticketCategoriesResource())
