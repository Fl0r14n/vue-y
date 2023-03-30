import type { ProductData, PromotionData, ReviewData } from '@/api'
import { FieldLevelMapping, ProductReferenceType, useProductResource, usePromotionResource } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const useProductStore = defineStore('ProductStore', () => {
  const productResource = useProductResource()
  const promotionResource = usePromotionResource()
  const product = ref<ProductData>()
  const code = computed({
    get: () => product.value?.code,
    set: code => code && loadProduct(code)
  })
  const promotions = ref<PromotionData[]>()
  const reviews = ref<ReviewData[]>()
  const loadProduct = async (code: string) => (product.value = await productResource.getProduct(code, { fields: FieldLevelMapping.FULL }))
  const loadReviews = async (code: string) =>
    (reviews.value = await productResource.getProductReviews(code, { fields: FieldLevelMapping.FULL }).then(v => v.reviews))

  watch(
    () => product.value?.potentialPromotions,
    async pr =>
      pr?.length &&
      (promotions.value = await Promise.all(pr.filter(p => !!p.code).map(p => promotionResource.getPromotion(p.code as string))))
  )

  watch(code, async pc => pc && loadReviews(pc))

  const references = (referenceTypes: ProductReferenceType[]) =>
    (code.value &&
      Promise.all(referenceTypes.map(referenceType => productResource.getProductReferences(code.value as string, { referenceType })))) ||
    undefined

  const addReview = async (review: ReviewData) => {
    if (code.value) {
      const result = await productResource.addProductReview(code.value, review)
      await loadReviews(code.value)
      return result
    }
  }

  return {
    product,
    code,
    promotions,
    references,
    loadProduct,
    addReview
  }
})

export const productGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const productStore = useProductStore()
  const { loadProduct } = productStore
  const { id } = to.params
  if (id) {
    await loadProduct(id as string)
    //TODO check for error
  }
  return next()
}
