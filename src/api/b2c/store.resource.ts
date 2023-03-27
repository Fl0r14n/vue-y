import type {
  PointOfServiceData,
  PointOfServiceListData,
  QueryRequestData,
  RequestData,
  StoreCountListData,
  StoreFinderSearchPageData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class StoreResource {
  getStores!: (
    queryParams?: {
      latitude?: number
      accuracy?: number
      radius?: number
      longitude?: number
    } & QueryRequestData
  ) => Promise<StoreFinderSearchPageData>
  getStore!: (storeId: string, queryParams?: RequestData) => Promise<PointOfServiceData>
  getStoresByCountry!: (countryIso: string, queryParams?: RequestData) => Promise<PointOfServiceListData>
  getStoresByCountryAndRegion!: (countryIso: string, regionIso: string, queryParams?: RequestData) => Promise<PointOfServiceListData>
  getStoreCount!: () => Promise<StoreCountListData>
}

const storeResource = (): StoreResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/stores`))
  return {
    getStores: (
      queryParams?: {
        latitude?: number
        accuracy?: number
        radius?: number
        longitude?: number
      } & QueryRequestData
    ) => rest.query<StoreFinderSearchPageData>({ params: queryParams }),
    getStore: (storeId: string, queryParams?: RequestData) => rest.get<PointOfServiceData>(storeId, { params: queryParams }),
    getStoresByCountry: (countryIso: string, queryParams?: RequestData) =>
      rest.get<PointOfServiceListData>(`country/${countryIso}`, { params: queryParams }),
    getStoresByCountryAndRegion: (countryIso: string, regionIso: string, queryParams?: RequestData) =>
      rest.get<PointOfServiceListData>(`country/${countryIso}/region/${regionIso}`, { params: queryParams }),
    getStoreCount: () => rest.get<StoreCountListData>(`storescounts`)
  }
}

export const useStoreResource = () => inject(StoreResource, storeResource())
