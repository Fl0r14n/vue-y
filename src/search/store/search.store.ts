import type { ProductSearchPageData } from '@/api'
import { FieldLevelMapping, useProductResource, useQueryable } from '@/api'
import { useLocaleConfig } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const useSearchStore = defineStore('SearchStore', () => {
  const productResource = useProductResource()
  const locale = useLocaleConfig()
  const searchPage = ref<ProductSearchPageData>()
  const { request, sort, query, pageSize, currentPage } = useQueryable()
  const sorts = computed(() => searchPage.value?.sorts)
  const products = computed(() => searchPage.value?.products)
  const pagination = computed(() => searchPage.value?.pagination)

  watch(
    [request, locale],
    async ([req]) =>
      (searchPage.value = await productResource.search({
        fields: FieldLevelMapping.FULL,
        ...req
      })),
    { deep: true }
  )

  return {
    query,
    sort,
    sorts,
    pageSize,
    currentPage,
    searchPage,
    products,
    pagination
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
