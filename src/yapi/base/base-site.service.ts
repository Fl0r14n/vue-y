import { useOAuth } from '@/oauth'
import type { BaseSiteListData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class BaseSiteService extends RestClient {
  oauth = useOAuth()

  constructor() {
    super()
    // ignore getBaseSites from oauth interceptor. This should work regardless of oauth state
    this.oauth.ignoredPaths.value?.push(new RegExp(this.getEndpoint()))
  }

  override get basePath() {
    const { api } = this.config.value
    return `${api?.host}${api?.path}`
  }

  getEndpoint() {
    return `${this.basePath}/basesites`
  }

  /**
   * Get all base sites with corresponding base stores details in FULL mode.
   * @param {RequestData} queryParams
   */
  getBaseSites(queryParams?: RequestData) {
    return this.query<BaseSiteListData>({ params: queryParams })
  }
}
