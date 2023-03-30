import type { ProductSearchPageData } from '@/api'
import { FieldLevelMapping, useProductResource, useQueryable } from '@/api'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const useSearchStore = defineStore('SearchStore', () => {
  const productResource = useProductResource()
  const searchPage = ref<ProductSearchPageData>()
  const { request, sort, query, pageSize, currentPage } = useQueryable()

  watch(
    request,
    async req =>
      (searchPage.value = await productResource.search({
        fields: FieldLevelMapping.FULL,
        ...req
      }))
  )

  return {
    query,
    sort,
    pageSize,
    currentPage,
    searchPage
  }
})

export const categoryGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { query } = storeToRefs(useSearchStore())
  const categoryId = to.params.id
  const searchType = (to.params.more?.includes('Brands') && 'brand') || 'category'
  query.value = `::${searchType}:${categoryId}`
  return next()
}

export const searchGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { query } = storeToRefs(useSearchStore())
  query.value = (to.query.text || to.query.q) as string
  return next()
}
