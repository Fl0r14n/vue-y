import type {
  CustomerInterestsSearchPageData,
  ProductInterestRelationData,
  ProductInterestRequestData,
  RequestData,
  WithTotalRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class ProductInterestResource {
  getProductInterests!: (queryParams?: ProductInterestRequestData & WithTotalRequestData) => Promise<CustomerInterestsSearchPageData>
  addProductInterests!: (interest: ProductInterestRequestData, queryParams?: RequestData) => Promise<ProductInterestRelationData>
  delProductInterests!: (interest: ProductInterestRequestData) => Promise<void>
}

const productInterestResource = (): ProductInterestResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}`))
  return {
    getProductInterests: (queryParams?: ProductInterestRequestData & WithTotalRequestData) =>
      rest.get<CustomerInterestsSearchPageData>('productinterests', { params: queryParams }),
    addProductInterests: (interest: ProductInterestRequestData, queryParams?: RequestData) =>
      rest.postAt<ProductInterestRelationData>('productinterests', {}, { params: { ...queryParams, ...interest } }),
    delProductInterests: (interest: ProductInterestRequestData) => rest.del<void>('productinterests', { params: interest })
  }
}

export const useProductInterestResource = () => inject(ProductInterestResource, productInterestResource())
