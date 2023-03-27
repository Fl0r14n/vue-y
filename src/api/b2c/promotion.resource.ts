import type { PromotionData, PromotionListData, PromotionType, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getPromotionRest = () => {
  const { sitePath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/promotions`))
}

export abstract class PromotionResource {
  getPromotions!: (
    type: PromotionType,
    queryParams?: {
      promotionGroup?: string
    } & RequestData
  ) => Promise<PromotionListData>
  getPromotion!: (code: string, queryParams?: RequestData) => Promise<PromotionData>
}

const promotionResource = (): PromotionResource => {
  const rest = getPromotionRest()
  return {
    getPromotions: (
      type: PromotionType,
      queryParams?: {
        promotionGroup?: string
      } & RequestData
    ) => rest.query<PromotionListData>({ params: queryParams }),
    getPromotion: (code: string, queryParams?: RequestData) => rest.get<PromotionData>(code, { params: queryParams })
  }
}

export const usePromotionResource = () => inject(PromotionResource, promotionResource())
