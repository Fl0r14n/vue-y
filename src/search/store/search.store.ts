import type { ProductSearchPageData } from '@/api'
import { FieldLevelMapping, useProductResource, useQueryable } from '@/api'
import { useLocaleConfig } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const updateQueryUrl = (key: string, value: string) => {
  const url = new URL(location.href)
  url.searchParams.set(key, value)
  history.pushState({}, '', url)
}

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

  watch(sort, s => s && updateQueryUrl('s', s as string))
  watch(pageSize, n => n && updateQueryUrl('n', `${n}`))
  watch(currentPage, p => p && updateQueryUrl('p', `${p}`))

  return {
    query,
    sort,
    sorts,
    pageSize,
    currentPage,
    searchPage,
    products,
    pagination,
    request
  }
})

export const categoryGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { query, sort, pageSize, currentPage } = storeToRefs(useSearchStore())
  const categoryId = to.params.id
  const searchType = (to.params.more?.includes('Brands') && 'brand') || 'category'
  const { s, n, p } = to.query
  query.value = `::${searchType}:${categoryId}`
  s && (sort.value = s as string)
  n && (pageSize.value = Number(n) || undefined)
  p && (currentPage.value = Number(p) || undefined)
  return next()
}

export const searchGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { query, sort, pageSize, currentPage } = storeToRefs(useSearchStore())
  const { s, n, p } = to.query
  query.value = (to.query.text || to.query.q) as string
  s && (sort.value = s as string)
  n && (pageSize.value = Number(n) || undefined)
  p && (currentPage.value = Number(p) || undefined)
  return next()
}
