import { useProductResource } from '@/api'
import type { ProductData, RequestData } from '@/api'
import { useLocaleStore } from '@/cms'
import { useCacheConfig } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useCmsProductStore = defineStore('CmsProductStore', () => {
  const cacheConfig = useCacheConfig()
  const productResource = useProductResource()
  const { storefront, language, currency } = storeToRefs(useLocaleStore())
  const localeKey = computed(() => `${storefront.value}.${language.value}.${currency.value}`)
  const getKey = (productIds: string[]) => `${localeKey.value}.${productIds.join(',')}`
  const get = (productIds: string[]) => cacheConfig.value?.products?.[getKey(productIds)]
  const set = (productIds: string[], value: ProductData[]) => {
    const { products } = cacheConfig.value || {}
    if (products) {
      products[getKey(productIds)] = value
    }
  }
  const search = async (codes: string[], queryParams?: RequestData) => {
    let result = get(codes)
    if (!result?.length) {
      result = await Promise.all(codes.map(code => productResource.getProduct(code, queryParams)))
      set(codes, result)
    }
    return result
  }
  return { search }
})
