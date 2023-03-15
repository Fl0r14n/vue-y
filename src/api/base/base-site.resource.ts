import { useRestClient, useRestContext } from '@/api'
import type { BaseSiteListData, RequestData } from '@/api/models'
import { inject } from '@/config'
import { useOAuth } from '@/oauth'
import { computed } from 'vue'

export abstract class BaseSiteResource {
  getBaseSites!: (queryParams?: RequestData) => Promise<BaseSiteListData>
}

const baseSiteResource = (): BaseSiteResource => {
  const { basePath } = useRestContext()
  const endpoint = computed(() => `${basePath.value}/basesites`)
  const rest = useRestClient(endpoint)
  const oauth = useOAuth()
  oauth.ignoredPaths.value?.push(new RegExp(endpoint.value))

  return {
    getBaseSites: (queryParams?: RequestData) => rest.query<BaseSiteListData>({ params: queryParams })
  }
}

export const useBaseSiteResource = () => inject(BaseSiteResource, baseSiteResource())
