import type { ProductFutureStocksData, ProductFutureStocksListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class FutureStockResource {
  getFutureStocks!: (productCodes: string[], queryParams?: RequestData) => Promise<ProductFutureStocksListData>
  getFutureStocksForProduct!: (productCode: string, queryParams?: RequestData) => Promise<ProductFutureStocksData>
}

const futureStockResource = (): FutureStockResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/futureStocks`))
  return {
    getFutureStocks: (productCodes: string[], queryParams?: RequestData) =>
      rest.query<ProductFutureStocksListData>({
        params: {
          productCodes,
          ...queryParams
        }
      }),
    getFutureStocksForProduct: (productCode: string, queryParams?: RequestData) =>
      rest.get<ProductFutureStocksData>(`${productCode}`, { params: queryParams })
  }
}

export const useFutureStockResource = () => inject(FutureStockResource, futureStockResource())
