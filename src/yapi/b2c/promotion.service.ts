import type { PromotionData, PromotionListData, PromotionType, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class PromotionService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/promotions`
  }

  /**
   * Returns promotions defined for a current base site.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {PromotionType} type. Defines what type of promotions should be returned.
   * @param {{promotionGroup?: string} & RequestData} queryParams
   */
  getPromotions(
    type: PromotionType,
    queryParams?: {
      /**
       * Only promotions from this group are returned
       */
      promotionGroup?: string
    } & RequestData
  ) {
    return this.query<PromotionListData>({ params: queryParams })
  }

  /**
   * Returns details of a single promotion specified by a promotion code.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} code. Promotion identifier (code)
   * @param {RequestData} queryParams
   */
  getPromotion(code: string, queryParams?: RequestData) {
    return this.get<PromotionData>(code, { params: queryParams })
  }
}
