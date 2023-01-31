import { CartEndpoint } from '@/yapi/b2c'
import type { BundleStarterData, CartModificationData, ProductSearchPageData, QueryRequestData } from '@/yapi/models'

export class BundlesService extends CartEndpoint {
  /**
   * Starts a bundle once the productCode, its quantity, and a bundle templateId is provided. A successful result returns a CartModification response.
   * @param {BundleStarterData} body
   * @param {string} cartId
   */
  addBundle(cartId: string, body: BundleStarterData) {
    return this.post<CartModificationData>(`${cartId}/bundles`, body)
  }

  /**
   * Returns products and additional data based on the entry group and search query provided.
   * Examples include available facets, available sorting, and pagination options. It can
   * also include spelling suggestions. To disable spelling suggestions "enableSpellCheck"
   * must be set to "FALSE" on the SearchQuery. Default is set to "TRUE".
   * The configuration of indexed properties is required for
   * spellchecking. Any of the products returned can be
   * added to the specific entry group (bundle).
   * @param {string} cartId
   * @param {string} entryGroupNumber
   * @param {QueryRequestData} searchParams
   */
  getProductsForEntryGroup(cartId: string, entryGroupNumber: string, searchParams?: QueryRequestData) {
    return this.get<ProductSearchPageData>(`${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch`, { params: searchParams })
  }
}
