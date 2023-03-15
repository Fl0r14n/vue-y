import type { BaseStoreData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class BaseStoreResource {
  getBaseStore!: (uid: string, queryParams?: RequestData) => Promise<BaseStoreData>
}

const baseStoreResource = (): BaseStoreResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/basestores`))

  return {
    getBaseStore: (uid: string, queryParams?: RequestData) => rest.get(uid, { params: queryParams })
  }
}

export const useBaseStoreResource = () => inject(BaseStoreResource, baseStoreResource())
