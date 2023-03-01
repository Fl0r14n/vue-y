import { inject } from '@/api'
import type {
  B2BPaymentTypeListData,
  CardTypeListData,
  CountryListData,
  CurrencyListData,
  LanguageListData,
  RequestData,
  TitleListData
} from '@/api/models'
import { useRestClient } from '@/api/rest'

export abstract class MiscResource {
  getCardTypes!: (queryParams?: RequestData) => Promise<CardTypeListData>
  getCurrencies!: (queryParams?: RequestData) => Promise<CurrencyListData>
  getDeliveryCountries!: (queryParams?: RequestData) => Promise<CountryListData>
  getLanguages!: (queryParams?: RequestData) => Promise<LanguageListData>
  getTitles!: (queryParams?: RequestData) => Promise<TitleListData>
  getPaymentTypes!: (queryParams?: RequestData) => Promise<B2BPaymentTypeListData>
}

const miscResource = (): MiscResource => {
  const rest = useRestClient()
  rest.endpoint.value = rest.sitePath.value
  return {
    getCardTypes: (queryParams?: RequestData) => rest.get<CardTypeListData>('cardtypes', { params: queryParams }),
    getCurrencies: (queryParams?: RequestData) => rest.get<CurrencyListData>('currencies', { params: queryParams }),
    getDeliveryCountries: (queryParams?: RequestData) => rest.get<CountryListData>('deliverycountries', { params: queryParams }),
    getLanguages: (queryParams?: RequestData) => rest.get<LanguageListData>('languages', { params: queryParams }),
    getTitles: (queryParams?: RequestData) => rest.get<TitleListData>('titles', { params: queryParams }),
    getPaymentTypes: (queryParams?: RequestData) => rest.get<B2BPaymentTypeListData>('paymenttypes', { params: queryParams })
  }
}

export const useMiscResource = () => inject(MiscResource, miscResource())
