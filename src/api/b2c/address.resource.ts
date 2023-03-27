import type { AddressData, AddressListData, AddressValidationData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getAddressRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/addresses`))
}

export abstract class AddressResource {
  getAddresses!: (queryParams?: RequestData) => Promise<AddressListData>
  addAddress!: (address: AddressData, queryParams?: RequestData) => Promise<void>
  getAddress!: (addressId: string, queryParams?: RequestData) => Promise<AddressData>
  delAddress!: (addressId: string) => Promise<void>
  setAddress!: (addressId: string, address: AddressData, queryParams?: RequestData) => Promise<void>
  verifyAddress!: (address: AddressData, queryParams?: RequestData) => Promise<AddressValidationData>
}

const addressResource = (): AddressResource => {
  const rest = getAddressRest()
  return {
    getAddresses: (queryParams?: RequestData) => rest.query<AddressListData>({ params: queryParams }),
    addAddress: (address: AddressData, queryParams?: RequestData) => rest.post<void>(address, { params: queryParams }),
    getAddress: (addressId: string, queryParams?: RequestData) => rest.get<AddressData>(addressId, { params: queryParams }),
    delAddress: (addressId: string) => rest.del<void>(addressId),
    setAddress: (addressId: string, address: AddressData, queryParams?: RequestData) =>
      rest.patch<void>(addressId, address, { params: queryParams }),
    verifyAddress: (address: AddressData, queryParams?: RequestData) =>
      rest.postAt<AddressValidationData>('verification', address, { params: queryParams })
  }
}

export const useAddressResource = () => inject(AddressResource, addressResource())
