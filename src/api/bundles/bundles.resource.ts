import { useRestClient, useRestContext } from '@/api'
import type { BundleStarterData, CartModificationData, ProductSearchPageData, QueryRequestData } from '@/api/models'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class BundlesResource {
  addBundle?: (cartId: string, body: BundleStarterData) => Promise<CartModificationData>
  getProductsForEntryGroup?: (cartId: string, entryGroupNumber: string, searchParams?: QueryRequestData) => Promise<ProductSearchPageData>
}

const bundlesResource = (): BundlesResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/carts`))
  return {
    addBundle: (cartId: string, body: BundleStarterData) => rest.postAt<CartModificationData>(`${cartId}/bundles`, body),
    getProductsForEntryGroup: (cartId: string, entryGroupNumber: string, searchParams?: QueryRequestData) =>
      rest.get<ProductSearchPageData>(`${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch`, { params: searchParams })
  }
}

export const useBundlesResource = inject(BundlesResource, bundlesResource())
