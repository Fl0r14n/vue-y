import type { ProductData, RequestData } from '@/api'
import { useProductResource } from '@/api/b2c/product.resource'
import { useLocaleStore } from '@/cms'
import { useCacheConfig } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { watch } from 'vue'

export const useCmsProductStore = defineStore('CmsProductStore', () => {
  const cacheConfig = useCacheConfig()
  const productResource = useProductResource()
  const { locale } = storeToRefs(useLocaleStore())
  const getKey = (componentIds: string[]) => componentIds.join(',')
  const get = (componentIds: string[]) => cacheConfig.value?.products?.[getKey(componentIds)]
  const set = (componentIds: string[], value: ProductData[]) => {
    const { products } = cacheConfig.value || {}
    if (products) {
      products[getKey(componentIds)] = value
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
  watch(locale, () => cacheConfig.value && (cacheConfig.value.products = {}))
  return { search }
})
