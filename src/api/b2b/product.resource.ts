import { ProductBaseResource, useProductBaseResource } from '@/api'
import type { ProductData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getOrgProductRest = () => {
  const { sitePath, orgPrefix } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/${orgPrefix('products')}`))
}

export abstract class ProductResource extends ProductBaseResource {}

const productResource = (): ProductResource => {
  const { isB2B } = useRestContext()
  const rest = getOrgProductRest()
  const productBaseResource = useProductBaseResource()
  return {
    ...productBaseResource,
    getProduct: (productCode: string, queryParams?: RequestData) =>
      (isB2B.value && rest.get<ProductData>(productCode, { params: queryParams })) ||
      productBaseResource.getProduct(productCode, queryParams)
  }
}

export const useProductResource = () => inject(ProductResource, productResource())
