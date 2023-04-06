import { getCartRest } from '@/api'
import type { BundleStarterData, CartModificationData, ProductSearchPageData, QueryRequestData } from '@/api/models'
import { inject } from '@/config'

export abstract class BundleResource {
  addBundle!: (cartId: string, body: BundleStarterData) => Promise<CartModificationData>
  getProductsForEntryGroup!: (cartId: string, entryGroupNumber: string, searchParams?: QueryRequestData) => Promise<ProductSearchPageData>
}

const bundleResource = (): BundleResource => {
  const rest = getCartRest()
  return {
    addBundle: (cartId = 'current', body: BundleStarterData) => rest.postAt<CartModificationData>(`${cartId}/bundles`, body),
    getProductsForEntryGroup: (cartId = 'current', entryGroupNumber: string, searchParams?: QueryRequestData) =>
      rest.get<ProductSearchPageData>(`${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch`, { params: searchParams })
  }
}

export const useBundleResource = inject(BundleResource, bundleResource())
