import type { ProductData, RequestData } from '@/api'
import { useProductResource } from '@/api/b2c/product.resource'
import { useCacheConfig } from '@/config'
import { defineStore } from 'pinia'

export const useCmsProductStore = defineStore('CmsProductStore', () => {
  const cacheConfig = useCacheConfig()
  const productResource = useProductResource()
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
  return { search }
})
