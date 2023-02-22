import type { AddressData, AddressListData, AddressValidationData, RequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class AddressService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/addresses`
  }

  /**
   * Returns customer's addresses.
   * @param {RequestData} queryParams
   */
  getAddresses(queryParams?: RequestData) {
    return this.query<AddressListData>({ params: queryParams })
  }

  /**
   * Creates a new address.
   * @param {AddressData} address
   * @param {RequestData} queryParams
   */
  addAddress(address: AddressData, queryParams?: RequestData) {
    return this.post<void>(address, { params: queryParams })
  }

  /**
   * Returns detailed information about address with a given id.
   * @param {string} addressId
   * @param {RequestData} queryParams
   */
  getAddress(addressId: string, queryParams?: RequestData) {
    return this.get<AddressData>(addressId, { params: queryParams })
  }

  /**
   * Removes customer's address.
   * @param {string} addressId
   */
  delAddress(addressId: string) {
    return this.delete<void>(addressId)
  }

  /**
   * Updates the address. Only attributes provided in the request body will be changed.
   * @param {string} addressId
   * @param {AddressData} address
   * @param {RequestData} queryParams
   */
  setAddress(addressId: string, address: AddressData, queryParams?: RequestData) {
    return this.patch<void>(addressId, address, { params: queryParams })
  }

  /**
   * Verifies address
   * @param {AddressData} address
   * @param {RequestData} queryParams
   */
  verifyAddress(address: AddressData, queryParams?: RequestData) {
    return this.postAt<AddressValidationData>('verification', address, { params: queryParams })
  }
}
