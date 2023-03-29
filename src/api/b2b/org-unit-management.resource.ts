import type {
  AddressData,
  AddressListData,
  B2BApprovalProcessListData,
  B2BSelectionData,
  B2BUnitData,
  B2BUnitNodeData,
  B2BUnitNodeListData,
  OrgUnitUserListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrgUnitManagementResource {
  getOrgUnits!: (queryParams?: RequestData) => Promise<B2BUnitNodeListData>
  addOrgCustomerRole!: (orgCustomerId: string, roleId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  delOrgCustomerRole!: (orgCustomerId: string, roleId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  addOrgUnit!: (orgUnit: B2BUnitData, queryParams?: RequestData) => Promise<B2BUnitData>
  getOrgUnit!: (orgUnitId: string, queryParams?: RequestData) => Promise<B2BUnitData>
  setOrgUnit!: (orgUnitId: string, orgUnit: B2BUnitData, queryParams?: RequestData) => Promise<B2BUnitData>
  getOrgUnitAddresses!: (orgUnitId: string, queryParams?: RequestData) => Promise<AddressListData>
  addOrgUnitAddress!: (orgUnitId: string, address: AddressData, queryParams?: RequestData) => Promise<AddressData>
  delOrgUnitAddress!: (orgUnitId: string, addressId: string) => Promise<void>
  setOrgUnitAddress!: (orgUnitId: string, addressId: string, address: AddressData) => Promise<void>
  getOrgUnitParents!: (orgUnitId: string, queryParams?: RequestData) => Promise<B2BUnitNodeListData>
  getOrgUnitUsers!: (orgUnitId: string, roleId: string, queryParams?: SortableRequestData) => Promise<OrgUnitUserListData>
  addOrgUnitCustomerRole!: (orgUnitId: string, orgCustomerId: string, roleId: string) => Promise<void>
  delOrgUnitCustomerRole!: (orgUnitId: string, orgCustomerId: string, roleId: string) => Promise<void>
  getOrgUnitApprovals!: (queryParams?: RequestData) => Promise<B2BApprovalProcessListData>
  getOrgUnitRoot!: (queryParams?: RequestData) => Promise<B2BUnitNodeData>
}

const orgUnitManagementResource = (): OrgUnitManagementResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}`))
  return {
    getOrgUnits: (queryParams?: RequestData) => rest.get<B2BUnitNodeListData>(`availableOrgUnitNodes`, { params: queryParams }),
    addOrgCustomerRole: (orgCustomerId: string, roleId: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(
        `orgCustomers/${orgCustomerId}/roles`,
        {},
        {
          params: {
            ...queryParams,
            roleId
          }
        }
      ),
    delOrgCustomerRole: (orgCustomerId: string, roleId: string, queryParams?: RequestData) =>
      rest.del<B2BSelectionData>(`orgCustomers/${orgCustomerId}/roles/${roleId}`, { params: queryParams }),
    addOrgUnit: (orgUnit: B2BUnitData, queryParams?: RequestData) => rest.postAt<B2BUnitData>(`orgUnits`, orgUnit, { params: queryParams }),
    getOrgUnit: (orgUnitId: string, queryParams?: RequestData) => rest.get<B2BUnitData>(`orgUnits/${orgUnitId}`, { params: queryParams }),
    setOrgUnit: (orgUnitId: string, orgUnit: B2BUnitData, queryParams?: RequestData) =>
      rest.patch<B2BUnitData>(`orgUnits/${orgUnitId}`, orgUnit, { params: queryParams }),
    getOrgUnitAddresses: (orgUnitId: string, queryParams?: RequestData) =>
      rest.get<AddressListData>(`orgUnits/${orgUnitId}/addresses`, { params: queryParams }),
    addOrgUnitAddress: (orgUnitId: string, address: AddressData, queryParams?: RequestData) =>
      rest.postAt<AddressData>(`orgUnits/${orgUnitId}/addresses`, address, { params: queryParams }),
    delOrgUnitAddress: (orgUnitId: string, addressId: string) => rest.del<void>(`orgUnits/${orgUnitId}/addresses/${addressId}`),
    setOrgUnitAddress: (orgUnitId: string, addressId: string, address: AddressData) =>
      rest.patch<void>(`orgUnits/${orgUnitId}/addresses/${addressId}`, address),
    getOrgUnitParents: (orgUnitId: string, queryParams?: RequestData) =>
      rest.get<B2BUnitNodeListData>(`orgUnits/${orgUnitId}/availableParents`, { params: queryParams }),
    getOrgUnitUsers: (orgUnitId: string, roleId: string, queryParams?: SortableRequestData) =>
      rest.get<OrgUnitUserListData>(`orgUnits/${orgUnitId}/availableUsers/${roleId}`, { params: queryParams }),
    addOrgUnitCustomerRole: (orgUnitId: string, orgCustomerId: string, roleId: string) =>
      rest.postAt<void>(`orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles`, {}, { params: { roleId } }),
    delOrgUnitCustomerRole: (orgUnitId: string, orgCustomerId: string, roleId: string) =>
      rest.del<void>(`orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles/${roleId}`),
    getOrgUnitApprovals: (queryParams?: RequestData) =>
      rest.get<B2BApprovalProcessListData>(`orgUnitsAvailableApprovalProcesses`, { params: queryParams }),
    getOrgUnitRoot: (queryParams?: RequestData) => rest.get<B2BUnitNodeData>(`orgUnitsRootNodeTree`, { params: queryParams })
  }
}

export const useOrgUnitManagementResource = () => inject(OrgUnitManagementResource, orgUnitManagementResource())
