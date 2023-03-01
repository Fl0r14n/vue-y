import { inject } from '@/api'
import type { BaseStoreData, RequestData } from '@/api/models'
import { useRestClient } from '@/api/rest'

export abstract class BaseStoreResource {
  getBaseStore!: (uid: string, queryParams?: RequestData) => Promise<BaseStoreData>
}

const baseStoreResource = (): BaseStoreResource => {
  const rest = useRestClient()
  rest.endpoint.value = `${rest.sitePath.value}/basestores`

  return {
    getBaseStore: (uid: string, queryParams?: RequestData) => rest.get(uid, { params: queryParams })
  }
}

export const useBaseStoreResource = () => inject(BaseStoreResource, baseStoreResource())
