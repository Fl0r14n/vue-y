import type { PageableRequestData, ProductListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class ExportResource {
  getProducts?: (
    queryParams?: {
      catalog?: string
      version?: string
      timestamp?: Date
    } & PageableRequestData
  ) => Promise<ProductListData>
}

const exportResource = (): ExportResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/export`))
  return {
    getProducts: (
      queryParams?: {
        catalog?: string
        version?: string
        timestamp?: Date
      } & PageableRequestData
    ) => rest.get<ProductListData>(`products`, { params: queryParams })
  }
}

export const useExportResource = () => inject(ExportResource, exportResource())
