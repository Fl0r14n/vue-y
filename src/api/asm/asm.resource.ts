import type {
  CustomerListData,
  CustomerSearchPageData,
  CustomerSearchRequestData,
  CustomerSuggestionData,
  UserGroupListData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject, useAsmConfig } from '@/config'
import { computed } from 'vue'

export abstract class AsmResource {
  bindCart?: (customerId: string, cartId: string) => Promise<string>
  getUserGroups?: () => Promise<UserGroupListData>
  getCustomers?: (userGroupId: string) => Promise<CustomerListData>
  suggestCustomers?: (customerQuery: string) => Promise<CustomerSuggestionData[]>
  searchCustomers?: (queryParams: CustomerSearchRequestData) => Promise<CustomerSearchPageData>
}

const asmResource = (): AsmResource => {
  const { host, siteId } = useRestContext()
  const asmConfig = useAsmConfig()
  const endpoint = computed(() => `${host.value}/${asmConfig.value?.path}`)
  const rest = useRestClient(endpoint)
  return {
    bindCart: (customerId: string, cartId: string) =>
      rest.postAt<string>(
        `customers`,
        {},
        {
          baseSite: siteId.value,
          customerId,
          cartId
        }
      ),
    getUserGroups: () => rest.get<UserGroupListData>(`customerlists`, { baseSite: siteId.value }),
    getCustomers: (userGroupId: string) => rest.get<CustomerListData>(`customerlists/${userGroupId}`, { baseSite: siteId.value }),
    suggestCustomers: (customerQuery: string) =>
      rest.get<CustomerSuggestionData[]>(`/customers/autocomplete`, {
        baseSite: siteId.value,
        customerQuery
      }),
    searchCustomers: (queryParams: CustomerSearchRequestData) =>
      rest.get<CustomerSearchPageData>(`customers/search`, {
        params: {
          ...{ baseSite: siteId.value },
          ...queryParams
        }
      })
  }
}

export const useAsmResource = () => inject(AsmResource, asmResource())
