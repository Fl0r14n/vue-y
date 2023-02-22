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
} from '@/api/models'
import { RestClient } from '@/api/rest'

export abstract class ProductEndpoint extends RestClient {
  getEndpoint() {
    return `${this.basePath}/products`
  }
}

export class ProductBaseService extends ProductEndpoint {
  /**
   * Returns details of a single product according to a product code.
   * @param {string} productCode. Product identifier
   * @param {RequestData} queryParams
   */
  getProduct(productCode: string, queryParams?: RequestData) {
    return this.get<ProductData>(productCode, { params: queryParams })
  }

  /**
   * Returns references for a product with a given product code. Reference type specifies which references to return.
   * @param {string} productCode. Product identifier
   * @param {{referenceType?: ProductReferenceType} & PageableRequestData} queryParams
   */
  getProductReferences(
    productCode?: string,
    queryParams?: {
      /**
       * Response configuration (list of fields, which should be returned in response) DEFAULT
       */
      referenceType?: ProductReferenceType | any
    } & PageableRequestData
  ) {
    return this.get<ProductReferenceListData>(`${productCode}/references`, { params: queryParams })
  }

  /**
   * Returns the reviews for a product with a given product code.
   * @param {string} productCode. Product identifier
   * @param {{maxCount?: number} & RequestData} queryParams
   */
  getProductReviews(
    productCode?: string,
    queryParams?: {
      maxCount?: number
    } & RequestData
  ) {
    return this.get<ReviewListData>(`${productCode}/reviews`, { params: queryParams })
  }

  /**
   * Creates a new customer review as an anonymous user.
   * @param {string} productCode. Product identifier
   * @param {ReviewData} review
   * @param {RequestData} queryParams
   */
  addProductReview(productCode: string, review: ReviewData, queryParams?: RequestData) {
    return this.postAt<ReviewData>(`${productCode}/reviews`, review, { params: queryParams })
  }

  /**
   * Returns product's stock levels sorted by distance from specific location
   * passed by free-text parameter or longitude and latitude parameters. <br/>
   * The following two sets of parameters are available:<br/>
   * * location (required), currentPage (optional), pageSize (optional) or <br/>
   * * longitude (required), latitude (required), currentPage (optional), pageSize(optional).
   * @param {string} productCode
   * @param {{latitude?: number; location?: string; longitude?: number} & PageableRequestData} queryParams
   */
  getProductStocks(
    productCode: string,
    queryParams?: {
      /**
       * Latitude location parameter.
       */
      latitude?: number
      /**
       * Free-text location
       */
      location?: string
      /**
       * Longitude location parameter.
       */
      longitude?: number
    } & PageableRequestData
  ) {
    return this.get<StoreFinderStockSearchPageData>(`${productCode}/stock`, { params: queryParams })
  }

  /**
   * Returns product's stock level for a particular store (POS).
   * @param {string} productCode. Product identifier
   * @param {string} storeName. Store identifier
   * @param {RequestData} queryParams
   */
  getProductStock(productCode: string, storeName: string, queryParams?: RequestData) {
    return this.get<StockData>(`${productCode}/stock/${storeName}`, { params: queryParams })
  }

  /**
   * Returns products added to the express update feed.
   * Returns only elements updated after the provided timestamp.The queue is cleared using a defined cronjob.
   * @param {Date | string} timestamp. Only items newer than the given parameter are retrieved from the queue. This parameter should be in RFC-8601 format.
   * @param {{catalog?: string} & RequestData} queryParams
   */
  getExpressUpdate(
    timestamp: Date | string,
    queryParams?: {
      /**
       * Only products from this catalog are returned. Format: catalogId:catalogVersion
       */
      catalog?: string
    } & RequestData
  ) {
    return this.get<ProductExpressUpdateElementListData>(`expressupdate`, {
      params: {
        timestamp,
        ...queryParams
      }
    })
  }

  /**
   * Returns a list of products and additional data, such as available facets, available sorting, and pagination options.<br/>
   * It can also include spelling suggestions. To make spelling suggestions work you need to:<br/>
   *  * Make sure "enableSpellCheck" on the SearchQuery is set to true. By default, it should be already set to "true".<br/>
   *  * You also need to have indexed properties configured to be used for spellchecking.
   * @param {QueryRequestData} queryParams. Serialized query, free text search, facets.<br/>
   * The format of a serialized query: freeTextSearch:sort:facetKey1:facetValue1:facetKey2:facetValue2
   */
  search(queryParams?: QueryRequestData) {
    return this.get<ProductSearchPageData>(`search`, { params: queryParams })
  }

  /**
   * Returns a list of all available suggestions related to a given term and limits the results to a specific value of the max parameter.
   * @param {string} term Specified term
   * @param {{max?: number} & RequestData} queryParams
   */
  suggestions(
    term: string,
    queryParams?: {
      /**
       * Specifies the limit of results. 10 default
       */
      max?: number
    } & RequestData
  ) {
    return this.get<SuggestionListData>(`suggestions`, {
      params: {
        term,
        ...queryParams
      }
    })
  }
}
