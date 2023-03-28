import type {
  B2BSelectionData,
  OrgCustomerCreationData,
  OrgCustomerModificationData,
  OrgUnitUserGroupListData,
  OrgUnitUserListData,
  RequestData,
  SortableRequestData,
  UserData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrgUnitCustomerResource {
  getOrgCustomers!: (queryParams?: SortableRequestData) => Promise<OrgUnitUserListData>
  addOrgCustomer!: (orgCustomer: OrgCustomerCreationData, queryParams?: RequestData) => Promise<UserData>
  getOrgCustomer!: (orgCustomerId: string, queryParams?: RequestData) => Promise<UserData>
  setOrgCustomer!: (
    orgCustomerId: string,
    orgCustomer: OrgCustomerCreationData,
    queryParams?: RequestData
  ) => Promise<OrgCustomerModificationData>
  getOrgCustomerApprovers!: (orgCustomerId: string, queryParams?: SortableRequestData) => Promise<OrgUnitUserListData>
  addOrgCustomerApprover!: (orgCustomerId: string, approverId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  delOrgCustomerApprover!: (orgCustomerId: string, approverId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  getOrgCustomerGroups!: (orgCustomerId: string, queryParams?: SortableRequestData) => Promise<OrgUnitUserGroupListData>
  addOrgCustomerGroup!: (orgCustomerId: string, userGroupId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  delOrgCustomerGroup!: (orgCustomerId: string, userGroupId: string) => Promise<void>
  getOrgCustomerPermissions!: (orgCustomerId: string, queryParams?: SortableRequestData) => Promise<OrgUnitUserGroupListData>
  addOrgCustomerPermission!: (orgCustomerId: string, permissionId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  delOrgCustomerPermission!: (orgCustomerId: string, permissionId: string, queryParams?: RequestData) => Promise<B2BSelectionData>
}

const orgUnitCustomerResource = (): OrgUnitCustomerResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orgCustomers`))
  return {
    getOrgCustomers: (queryParams?: SortableRequestData) => rest.query<OrgUnitUserListData>({ params: queryParams }),
    addOrgCustomer: (orgCustomer: OrgCustomerCreationData, queryParams?: RequestData) =>
      rest.post<UserData>(orgCustomer, { params: queryParams }),
    getOrgCustomer: (orgCustomerId: string, queryParams?: RequestData) => rest.get<UserData>(orgCustomerId, { params: queryParams }),
    setOrgCustomer: (orgCustomerId: string, orgCustomer: OrgCustomerCreationData, queryParams?: RequestData) =>
      rest.patch<OrgCustomerModificationData>(orgCustomerId, orgCustomer, { params: queryParams }),
    getOrgCustomerApprovers: (orgCustomerId: string, queryParams?: SortableRequestData) =>
      rest.get<OrgUnitUserListData>(`${orgCustomerId}/approvers`, { params: queryParams }),
    addOrgCustomerApprover: (orgCustomerId: string, approverId: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(`${orgCustomerId}/approvers/${approverId}`, null, { params: queryParams }),
    delOrgCustomerApprover: (orgCustomerId: string, approverId: string, queryParams?: RequestData) =>
      rest.del<B2BSelectionData>(`${orgCustomerId}/approvers/${approverId}`, { params: queryParams }),
    getOrgCustomerGroups: (orgCustomerId: string, queryParams?: SortableRequestData) =>
      rest.get<OrgUnitUserGroupListData>(`${orgCustomerId}/orgUserGroups`, { params: queryParams }),
    addOrgCustomerGroup: (orgCustomerId: string, userGroupId: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(`${orgCustomerId}/orgUserGroups/${userGroupId}`, null, { params: queryParams }),
    delOrgCustomerGroup: (orgCustomerId: string, userGroupId: string) => rest.del<void>(`${orgCustomerId}/orgUserGroups/${userGroupId}`),
    getOrgCustomerPermissions: (orgCustomerId: string, queryParams?: SortableRequestData) =>
      rest.get<OrgUnitUserGroupListData>(`${orgCustomerId}/permissions`, { params: queryParams }),
    addOrgCustomerPermission: (orgCustomerId: string, permissionId: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(`${orgCustomerId}/permissions/${permissionId}`, null, { params: queryParams }),
    delOrgCustomerPermission: (orgCustomerId: string, permissionId: string, queryParams?: RequestData) =>
      rest.del<B2BSelectionData>(`${orgCustomerId}/permissions/${permissionId}`, { params: queryParams })
  }
}

export const useOrgUnitCustomerResource = () => inject(OrgUnitCustomerResource, orgUnitCustomerResource())
