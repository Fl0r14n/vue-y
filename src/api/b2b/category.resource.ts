import type { ProductSearchPageData, QueryRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class CategoryResource {
  getProductsByCategory!: (categoryId: string, queryParams?: QueryRequestData) => Promise<ProductSearchPageData>
}

const categoryResource = (): CategoryResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/categories`))
  return {
    getProductsByCategory: (categoryId: string, queryParams?: QueryRequestData) =>
      rest.get<ProductSearchPageData>(`${categoryId}/products`, { params: queryParams })
  }
}

export const useCategoryResource = () => inject(CategoryResource, categoryResource())
