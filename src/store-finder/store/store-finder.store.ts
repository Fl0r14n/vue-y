import { FieldLevelMapping, type PointOfServiceStockData, type StoreFinderSearchPageData, useQueryable, useStoreResource } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useStoreFinder = defineStore('StoreFinder', () => {
  const storeResource = useStoreResource()
  const { request, pageSize, sort, currentPage } = useQueryable()
  const query = computed({
    get: () => request.value.query,
    set: query => {
      if (request.value) {
        request.value.currentPage = 0
        request.value.query = query
      }
    }
  })
  const storesPage = ref<StoreFinderSearchPageData>()
  const stores = computed(() => storesPage.value?.stores)
  const pagination = computed(() => storesPage.value?.pagination)
  const store = ref<PointOfServiceStockData>()

  watch(
    request,
    req => {
      navigator.geolocation.getCurrentPosition(async position => {
        const { coords } = position
        const { latitude, longitude } = coords
        await storeResource.getStores({
          radius: 35000000,
          latitude,
          longitude,
          fields: FieldLevelMapping.FULL,
          ...req
        })
      })
    },
    { deep: true }
  )

  return {
    query,
    sort,
    currentPage,
    pageSize,
    storesPage,
    stores,
    pagination,
    store
  }
})
