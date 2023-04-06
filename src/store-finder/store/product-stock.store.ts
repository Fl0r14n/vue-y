import {
  type PointOfServiceStockData,
  type QueryRequestData,
  type StoreFinderSearchPageData,
  useProductResource,
  useQueryable
} from '@/api'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useProductStockStore = defineStore('ProductStockStore', () => {
  const productResource = useProductResource()
  const { request, pageSize, sort, currentPage } = useQueryable<QueryRequestData & { productCode: string }>()
  const productCode = computed({
    get: () => request.value.productCode,
    set: productCode => request.value && (request.value.productCode = productCode)
  })
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
        storesPage.value = await productResource.getProductStocks(req.productCode || '', {
          ...((req.query && {
            location: req.query
          }) || {
            longitude,
            latitude
          }),
          fields: 'pagination(DEFAULT),stores(FULL)',
          ...req
        })
      })
    },
    { deep: true }
  )

  return {
    productCode,
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
