import type { BaseStoreData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class BaseStoreService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/basestores`
  }

  /**
   * Returns details of a specific base store based on its identifier. The response contains detailed base store information.
   * @param {string} uid
   * @param {RequestData} queryParams
   */
  getBaseStore(uid: string, queryParams?: RequestData) {
    return this.get<BaseStoreData>(uid, { params: queryParams })
  }
}
