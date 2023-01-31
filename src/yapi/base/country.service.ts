import type { CountryDestinationType, CountryListData, RegionListData, RequestData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class CountryService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/countries`
  }

  /**
   * If the value of type equals to shipping, then return shipping countries.
   * If the value of type equals to billing, then return billing countries.
   * If the value of type is not given, return all countries.
   * The list is sorted alphabetically.
   * @param {{type?: CountryDestinationType} & RequestData} queryParams
   */
  getCountries(
    queryParams?: {
      /**
       * The type of countries.
       */
      type?: CountryDestinationType
    } & RequestData
  ) {
    return this.query<CountryListData>({ params: queryParams })
  }

  /**
   * Lists all regions
   * @param {string} countyIsoCode
   * @param {RequestData} queryParams
   */
  getRegions(countyIsoCode: string, queryParams?: RequestData) {
    return this.get<RegionListData>(`${countyIsoCode}/regions`, { params: queryParams })
  }
}
