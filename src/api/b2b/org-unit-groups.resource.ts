import type {
  B2BSelectionData,
  OrderApprovalPermissionListData,
  OrgUnitUserGroupData,
  OrgUnitUserGroupListData,
  OrgUnitUserListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrgUnitGroupsResource {
  getOrgUserGroups!: (queryParams?: SortableRequestData) => Promise<OrgUnitUserGroupListData>
  addOrgUserGroup!: (orgUnitUserGroup: OrgUnitUserGroupData, queryParams?: RequestData) => Promise<OrgUnitUserGroupData>
  getOrgUserGroup!: (orgUnitUserGroupId: string, queryParams?: RequestData) => Promise<OrgUnitUserGroupData>
  delOrgUserGroup!: (orgUnitUserGroupId: string) => Promise<void>
  setOrgUserGroup!: (orgUnitUserGroupId: string) => Promise<void>
  getOrgUserGroupApprovals!: (orgUnitUserGroupId: string, queryParams?: SortableRequestData) => Promise<OrderApprovalPermissionListData>
  getOrgUserGroupCustomers!: (orgUnitUserGroupId: string, queryParams?: SortableRequestData) => Promise<OrgUnitUserListData>
  addOrgUserGroupCustomer!: (orgUnitUserGroupId: string, orgCustomerId: string) => Promise<void>
  delOrgUserGroupCustomers!: (orgUnitUserGroupId: string) => Promise<void>
  delOrgUserGroupCustomer!: (orgUnitUserGroupId: string, orgCustomerId: string) => Promise<void>
  addOrgUserApprovalPermission!: (
    orgUnitUserGroupId: string,
    orderApprovalPermissionCode: string,
    queryParams?: RequestData
  ) => Promise<B2BSelectionData>
  delOrgUserApprovalPermission!: (
    orgUnitUserGroupId: string,
    orderApprovalPermissionCode: string,
    queryParams?: RequestData
  ) => Promise<B2BSelectionData>
}

const orgUnitGroupsResource = (): OrgUnitGroupsResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/orgUnitUserGroups`))
  return {
    getOrgUserGroups: (queryParams?: SortableRequestData) => rest.query<OrgUnitUserGroupListData>({ params: queryParams }),
    addOrgUserGroup: (orgUnitUserGroup: OrgUnitUserGroupData, queryParams?: RequestData) =>
      rest.post<OrgUnitUserGroupData>(orgUnitUserGroup, { params: queryParams }),
    getOrgUserGroup: (orgUnitUserGroupId: string, queryParams?: RequestData) =>
      rest.get<OrgUnitUserGroupData>(orgUnitUserGroupId, { params: queryParams }),
    delOrgUserGroup: (orgUnitUserGroupId: string) => rest.del<void>(orgUnitUserGroupId),
    setOrgUserGroup: (orgUnitUserGroupId: string) => rest.patch<void>(orgUnitUserGroupId, null),
    getOrgUserGroupApprovals: (orgUnitUserGroupId: string, queryParams?: SortableRequestData) =>
      rest.get<OrderApprovalPermissionListData>(`${orgUnitUserGroupId}/availableOrderApprovalPermissions`, { params: queryParams }),
    getOrgUserGroupCustomers: (orgUnitUserGroupId: string, queryParams?: SortableRequestData) =>
      rest.get<OrgUnitUserListData>(`${orgUnitUserGroupId}/availableOrgCustomers`, { params: queryParams }),
    addOrgUserGroupCustomer: (orgUnitUserGroupId: string, orgCustomerId: string) =>
      rest.postAt<void>(`${orgUnitUserGroupId}/members`, { orgCustomerId }),
    delOrgUserGroupCustomers: (orgUnitUserGroupId: string) => rest.del<void>(`${orgUnitUserGroupId}/members`),
    delOrgUserGroupCustomer: (orgUnitUserGroupId: string, orgCustomerId: string) =>
      rest.del<void>(`${orgUnitUserGroupId}/members/${orgCustomerId}`),
    addOrgUserApprovalPermission: (orgUnitUserGroupId: string, orderApprovalPermissionCode: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(
        `${orgUnitUserGroupId}/orderApprovalPermissions`,
        { orderApprovalPermissionCode },
        { params: queryParams }
      ),
    delOrgUserApprovalPermission: (orgUnitUserGroupId: string, orderApprovalPermissionCode: string, queryParams?: RequestData) =>
      rest.del<B2BSelectionData>(`${orgUnitUserGroupId}/orderApprovalPermissions/${orderApprovalPermissionCode}`, {
        params: queryParams
      })
  }
}

export const useOrgUnitGroupsResource = () => inject(OrgUnitGroupsResource, orgUnitGroupsResource())
