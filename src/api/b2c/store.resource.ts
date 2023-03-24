import type {
  PointOfServiceData,
  PointOfServiceListData,
  QueryRequestData,
  RequestData,
  StoreCountListData,
  StoreFinderSearchPageData
} from '@/api/models'
import { RestClient } from '@/api/rest'

export class StoreResource extends RestClient {
  getEndpoint() {
    return `${this.basePath}/stores`
  }

  /**
   * Lists all store locations that are near the location specified in a query or based on latitude and longitude.
   * @param {{latitude?: number; accuracy?: number; radius?: number; longitude?: number} & QueryRequestData} queryParams
   */
  getStores(
    queryParams?: {
      /**
       * Coordinate that specifies the north-south position of a point on the Earth's surface.
       */
      latitude?: number
      /**
       * Accuracy in meters.
       */
      accuracy?: number
      /**
       * Radius in meters. Max value: 40075000.0 (Earth's perimeter).
       */
      radius?: number
      /**
       * Coordinate that specifies the east-west position of a point on the Earth's surface.
       */
      longitude?: number
    } & QueryRequestData
  ) {
    return this.query<StoreFinderSearchPageData>({ params: queryParams })
  }

  /**
   * Returns store location based on its unique name.
   * @param {string} storeId. Store identifier (currently store name)
   * @param {RequestData} queryParams
   */
  getStore(storeId: string, queryParams?: RequestData) {
    return this.get<PointOfServiceData>(storeId, { params: queryParams })
  }

  /**
   * Lists all store locations that are in the specified country.
   * @param {string} countryIso
   * @param {RequestData} queryParams
   */
  getStoresByCountry(countryIso: string, queryParams?: RequestData) {
    return this.get<PointOfServiceListData>(`country/${countryIso}`, { params: queryParams })
  }

  /**
   * Lists all store locations that are in the specified country and region.
   * @param {string} countryIso
   * @param {string} regionIso
   * @param {RequestData} queryParams
   */
  getStoresByCountryAndRegion(countryIso: string, regionIso: string, queryParams?: RequestData) {
    return this.get<PointOfServiceListData>(`country/${countryIso}/region/${regionIso}`, { params: queryParams })
  }

  /**
   * Returns store counts in countries and regions
   */
  getStoreCount() {
    return this.get<StoreCountListData>(`storescounts`)
  }
}
