import { useRestClient } from '@/api'
import type { BaseSiteListData, RequestData } from '@/api/models'
import { useOAuth } from '@/oauth'

export const useBaseSiteApi = () => {
  const rest = useRestClient()
  const oauth = useOAuth()
  rest.endpoint.value = `${rest.basePath.value}/basesites`
  oauth.ignoredPaths.value?.push(new RegExp(rest.endpoint.value))

  const getBaseSites = (queryParams?: RequestData) => {
    return rest.query<BaseSiteListData>({ params: queryParams })
  }

  return {
    getBaseSites
  }
}

// export class BaseSiteService extends RestClient {
//   // oauth = useOAuth()
//
//   constructor(protected http: AxiosInstance, protected config: Ref<Config>, protected oauth: any) {
//     super(http, config)
//     console.log(this.oauth)
//     // ignore getBaseSites from oauth interceptor. This should work regardless of oauth state
//     // this.oauth.ignoredPaths.value?.push(new RegExp(this.getEndpoint()))
//   }
//
//   override get basePath() {
//     const { api } = this.config.value
//     return `${api?.host}${api?.path}`
//   }
//
//   getEndpoint() {
//     return `${this.basePath}/basesites`
//   }
//
//   /**
//    * Get all base sites with corresponding base stores details in FULL mode.
//    * @param {RequestData} queryParams
//    */
//   getBaseSites(queryParams?: RequestData) {
//     return this.query<BaseSiteListData>({ params: queryParams })
//   }
// }
