import { useRestClient } from '@/api'
import type { BaseSiteListData, RequestData } from '@/api/models'
import { inject } from '@/config'
import { useOAuth } from '@/oauth'

export abstract class BaseSiteResource {
  getBaseSites!: (queryParams?: RequestData) => Promise<BaseSiteListData>
}

const baseSiteResource = (): BaseSiteResource => {
  const rest = useRestClient()
  const oauth = useOAuth()
  rest.endpoint.value = `${rest.basePath.value}/basesites`
  oauth.ignoredPaths.value?.push(new RegExp(rest.endpoint.value))

  return {
    getBaseSites: (queryParams?: RequestData) => rest.query<BaseSiteListData>({ params: queryParams })
  }
}

export const useBaseSiteResource = () => inject(BaseSiteResource, baseSiteResource())
