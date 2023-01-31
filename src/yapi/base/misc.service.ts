import type {
  B2BPaymentTypeListData,
  CardTypeListData,
  CountryListData,
  CurrencyListData,
  LanguageListData,
  RequestData,
  TitleListData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class MiscService extends RestClient {
  getEndpoint() {
    return `${this.basePath}`
  }

  /**
   * Lists supported payment card types.
   * @param {RequestData} queryParams
   */
  getCardTypes(queryParams?: RequestData) {
    return this.get<CardTypeListData>(`cardtypes`, { params: queryParams })
  }

  /**
   * Lists all available currencies (all usable currencies for the current store).<br/>
   * If the list of currencies for stores is empty, a list of all currencies available in the system is returned.
   * @param {RequestData} queryParams
   */
  getCurrencies(queryParams?: RequestData) {
    return this.get<CurrencyListData>(`currencies`, { params: queryParams })
  }

  /**
   * @deprecated
   * Lists all supported delivery countries for the current store. The list is sorted alphabetically.
   * @param {RequestData} queryParams
   */
  getDeliveryCountries(queryParams?: RequestData) {
    return this.get<CountryListData>(`deliverycountries`, { params: queryParams })
  }

  /**
   * Lists all available languages (all languages used for a particular store).<br/>
   * If the list of languages for a base store is empty, a list of all languages available in the system will be returned.
   * @param {RequestData} queryParams
   */
  getLanguages(queryParams?: RequestData) {
    return this.get<LanguageListData>(`languages`, { params: queryParams })
  }

  /**
   * Lists all localized titles.
   * @param {RequestData} queryParams
   */
  getTitles(queryParams?: RequestData) {
    return this.get<TitleListData>(`titles`, { params: queryParams })
  }

  /**
   * Returns a list of the available payment types in the B2B checkout process.
   * @param {RequestData} queryParams
   */
  getPaymentTypes(queryParams?: RequestData) {
    return this.get<B2BPaymentTypeListData>('paymenttypes', { params: queryParams })
  }
}
