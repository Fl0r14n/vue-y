import type { ProductData } from '@/api'
import { FieldLevelMapping } from '@/api'
import { useProductResource } from '@/api/b2c/product.resource'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const useProductStore = defineStore('ProductStore', () => {
  const product = ref<ProductData>()
  const productResource = useProductResource()
  const loadProduct = async (code: string) => (product.value = await productResource.getProduct(code, { fields: FieldLevelMapping.FULL }))
  return {
    product,
    loadProduct
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
