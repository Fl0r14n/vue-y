import type {
  PageableRequestData,
  ProductData,
  ProductExpressUpdateElementListData,
  ProductReferenceListData,
  ProductReferenceType,
  ProductSearchPageData,
  QueryRequestData,
  RequestData,
  ReviewData,
  ReviewListData,
  StockData,
  StoreFinderStockSearchPageData,
  SuggestionListData
} from '@/api'
import { useRestClient, useRestContext } from '@/api'
import { inject } from '@/config'
import { computed } from 'vue'

export const getProductRest = () => {
  const { sitePath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/products`))
}

export abstract class ProductBaseResource {
  getProduct!: (productCode: string, queryParams?: RequestData) => Promise<ProductData>
  getProductReferences!: (
    productCode: string,
    queryParams?: {
      referenceType?: ProductReferenceType | any
    } & PageableRequestData
  ) => Promise<ProductReferenceListData>
  getProductReviews!: (
    productCode: string,
    queryParams?: {
      maxCount?: number
    } & RequestData
  ) => Promise<ReviewListData>
  addProductReview!: (productCode: string, review: ReviewData, queryParams?: RequestData) => Promise<ReviewData>
  getProductStocks!: (
    productCode: string,
    queryParams?: {
      latitude?: number
      location?: string
      longitude?: number
    } & PageableRequestData
  ) => Promise<StoreFinderStockSearchPageData>
  getProductStock!: (productCode: string, storeName: string, queryParams?: RequestData) => Promise<StockData>
  getExpressUpdate!: (
    timestamp: Date | string,
    queryParams?: {
      catalog?: string
    } & RequestData
  ) => Promise<ProductExpressUpdateElementListData>
  search!: (queryParams?: QueryRequestData) => Promise<ProductSearchPageData>
  suggestions!: (
    term: string,
    queryParams?: {
      max?: number
    } & RequestData
  ) => Promise<SuggestionListData>
}

const productBaseResource = (): ProductBaseResource => {
  const rest = getProductRest()
  return {
    getProduct: (productCode: string, queryParams?: RequestData) => rest.get<ProductData>(productCode, { params: queryParams }),
    getProductReferences: (
      productCode: string,
      queryParams?: {
        referenceType?: ProductReferenceType | any
      } & PageableRequestData
    ) => rest.get<ProductReferenceListData>(`${productCode}/references`, { params: queryParams }),
    getProductReviews: (
      productCode: string,
      queryParams?: {
        maxCount?: number
      } & RequestData
    ) => rest.get<ReviewListData>(`${productCode}/reviews`, { params: queryParams }),
    addProductReview: (productCode: string, review: ReviewData, queryParams?: RequestData) =>
      rest.postAt<ReviewData>(`${productCode}/reviews`, review, { params: queryParams }),
    getProductStocks: (
      productCode: string,
      queryParams?: {
        latitude?: number
        location?: string
        longitude?: number
      } & PageableRequestData
    ) => rest.get<StoreFinderStockSearchPageData>(`${productCode}/stock`, { params: queryParams }),
    getProductStock: (productCode: string, storeName: string, queryParams?: RequestData) =>
      rest.get<StockData>(`${productCode}/stock/${storeName}`, { params: queryParams }),
    getExpressUpdate: (
      timestamp: Date | string,
      queryParams?: {
        catalog?: string
      } & RequestData
    ) =>
      rest.get<ProductExpressUpdateElementListData>(`expressupdate`, {
        params: {
          timestamp,
          ...queryParams
        }
      }),
    search: (queryParams?: QueryRequestData) => rest.get<ProductSearchPageData>(`search`, { params: queryParams }),
    suggestions: (
      term: string,
      queryParams?: {
        max?: number
      } & RequestData
    ) =>
      rest.get<SuggestionListData>(`suggestions`, {
        params: {
          term,
          ...queryParams
        }
      })
  }
}

export const useProductBaseResource = () => inject(ProductBaseResource, productBaseResource())
