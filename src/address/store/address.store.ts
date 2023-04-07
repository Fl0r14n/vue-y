import {
  type AddressData,
  type CountryData,
  CountryDestinationType,
  FieldLevelMapping,
  useAddressResource,
  useCountryResource
} from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

export const useAddressStore = defineStore('AddressStore', () => {
  const addressResource = useAddressResource()
  const countryResource = useCountryResource()
  const { user, isUser } = storeToRefs(useUserStore())
  const addresses = ref<AddressData[]>()
  const shippingCountries = ref<CountryData[]>()
  const billingCountries = ref<CountryData[]>()
  const loadAddresses = async () =>
    isUser.value && (addresses.value = await addressResource.getAddresses({ fields: FieldLevelMapping.FULL }).then(v => v.addresses))

  watch(user, async () => loadAddresses())

  const addAddress = async (address: AddressData) => {
    await addressResource.addAddress(address)
    await loadAddresses()
  }
  const setAddress = async (id: string, address: AddressData) => {
    await addressResource.setAddress(id, address)
    await loadAddresses()
  }
  const delAddress = async (id: string) => {
    await addressResource.delAddress(id)
    await loadAddresses()
  }

  const init = async () => {
    shippingCountries.value = await countryResource.getCountries({ type: CountryDestinationType.SHIPPING }).then(c => c.countries)
    billingCountries.value = await countryResource.getCountries({ type: CountryDestinationType.BILLING }).then(c => c.countries)
  }
  init().then()

  return {
    addresses,
    addAddress,
    setAddress,
    delAddress,
    shippingCountries,
    billingCountries
  }
})
