import { getCartRest } from '@/api'
import type { BundleStarterData, CartModificationData, ProductSearchPageData, QueryRequestData } from '@/api/models'
import { inject } from '@/config'

export abstract class BundlesResource {
  addBundle!: (cartId: string, body: BundleStarterData) => Promise<CartModificationData>
  getProductsForEntryGroup!: (cartId: string, entryGroupNumber: string, searchParams?: QueryRequestData) => Promise<ProductSearchPageData>
}

const bundlesResource = (): BundlesResource => {
  const rest = getCartRest()
  return {
    addBundle: (cartId = 'current', body: BundleStarterData) => rest.postAt<CartModificationData>(`${cartId}/bundles`, body),
    getProductsForEntryGroup: (cartId = 'current', entryGroupNumber: string, searchParams?: QueryRequestData) =>
      rest.get<ProductSearchPageData>(`${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch`, { params: searchParams })
  }
}

export const useBundlesResource = inject(BundlesResource, bundlesResource())
