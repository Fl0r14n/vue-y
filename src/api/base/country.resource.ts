import type { CountryDestinationType, CountryListData, RegionListData, RequestData } from '@/api/models'
import { useRestClient } from '@/api/rest'
import { inject } from 'vue'

export abstract class CountryResource {
  getCountries!: (queryParams?: { type?: CountryDestinationType } & RequestData) => Promise<CountryListData>
  getRegions!: (countyIsoCode: string, queryParams?: RequestData) => Promise<RegionListData>
}

const countryResource = (): CountryResource => {
  const rest = useRestClient()
  rest.endpoint.value = `${rest.sitePath.value}/countries`
  return {
    getCountries: (queryParams?: { type?: CountryDestinationType } & RequestData) => rest.query<CountryListData>({ params: queryParams }),
    getRegions: (countyIsoCode: string, queryParams?: RequestData) =>
      rest.get<RegionListData>(`${countyIsoCode}/regions`, { params: queryParams })
  }
}

export const useCountryResource = () => inject<CountryResource>(CountryResource.name, countryResource())!
