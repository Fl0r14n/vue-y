import type {
  B2BSelectionData,
  OrderApprovalPermissionListData,
  OrgUnitUserGroupData,
  OrgUnitUserGroupListData,
  OrgUnitUserListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class OrgUnitGroupsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orgUnitUserGroups`
  }

  /**
   * Returns the list of organizational unit user groups accessible for a specified base store.
   * @param {SortableRequestData} queryParams
   */
  getOrgUserGroups(queryParams?: SortableRequestData) {
    return this.query<OrgUnitUserGroupListData>({ params: queryParams })
  }

  /**
   * Creates a new organizational unit user group.
   * @param {OrgUnitUserGroupData} orgUnitUserGroup
   * @param {RequestData} queryParams
   */
  addOrgUserGroup(orgUnitUserGroup: OrgUnitUserGroupData, queryParams?: RequestData) {
    return this.post<OrgUnitUserGroupData>(orgUnitUserGroup, { params: queryParams })
  }

  /**
   * Returns specific UserGroup details accessible for a specified base store based on UserGroup code.
   * The response contains detailed order information.
   * @param {string} orgUnitUserGroupId
   * @param {RequestData} queryParams
   */
  getOrgUserGroup(orgUnitUserGroupId: string, queryParams?: RequestData) {
    return this.get<OrgUnitUserGroupData>(orgUnitUserGroupId, { params: queryParams })
  }

  /**
   * Removes the organizational unit user group.
   * @param {string} orgUnitUserGroupId
   */
  delOrgUserGroup(orgUnitUserGroupId: string) {
    return this.delete<void>(orgUnitUserGroupId)
  }

  /**
   * Updates the organizational unit user group. Only attributes provided in the request body will be changed.
   * @param {string} orgUnitUserGroupId
   */
  setOrgUserGroup(orgUnitUserGroupId: string) {
    return this.patch<void>(orgUnitUserGroupId, null)
  }

  /**
   * Returns the list of order approval permissions who can belong to a specific organizational unit user group.
   * Order approval permissions who already belong to the user group are flagged by ‘selected’ attribute.
   * @param {string} orgUnitUserGroupId
   * @param {SortableRequestData} queryParams
   */
  getOrgUserGroupApprovals(orgUnitUserGroupId: string, queryParams?: SortableRequestData) {
    return this.get<OrderApprovalPermissionListData>(`${orgUnitUserGroupId}/availableOrderApprovalPermissions`, { params: queryParams })
  }

  /**
   * Returns the list of organizational customers who can belong to a specific organizational unit user group.
   * Users who already belong to the user group are flagged by ‘selected’ attribute.
   * @param {string} orgUnitUserGroupId
   * @param {SortableRequestData} queryParams
   */
  getOrgUserGroupCustomers(orgUnitUserGroupId: string, queryParams?: SortableRequestData) {
    return this.get<OrgUnitUserListData>(`${orgUnitUserGroupId}/availableOrgCustomers`, { params: queryParams })
  }

  /**
   * Adds an organizational customer to a specific unit user group members
   * @param {string} orgUnitUserGroupId
   * @param {string} orgCustomerId
   */
  addOrgUserGroupCustomer(orgUnitUserGroupId: string, orgCustomerId: string) {
    return this.postAt<void>(`${orgUnitUserGroupId}/members`, { orgCustomerId })
  }

  /**
   * Removes all organizational customers in the organizational unit user group members
   * which marks the user group disabled until a new member is added
   * @param {string} orgUnitUserGroupId
   */
  delOrgUserGroupCustomers(orgUnitUserGroupId: string) {
    return this.delete<void>(`${orgUnitUserGroupId}/members`)
  }

  /**
   * Removes an organizational customer from the organizational unit user group members
   * @param {string} orgUnitUserGroupId
   * @param {string} orgCustomerId
   */
  delOrgUserGroupCustomer(orgUnitUserGroupId: string, orgCustomerId: string) {
    return this.delete<void>(`${orgUnitUserGroupId}/members/${orgCustomerId}`)
  }

  /**
   * Adds an order approval permission to a specific organizational unit user group
   * @param {string} orgUnitUserGroupId
   * @param {string} orderApprovalPermissionCode
   * @param {RequestData} queryParams
   */
  addOrgUserApprovalPermission(orgUnitUserGroupId: string, orderApprovalPermissionCode: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(
      `${orgUnitUserGroupId}/orderApprovalPermissions`,
      { orderApprovalPermissionCode },
      { params: queryParams }
    )
  }

  /**
   * Removes an order approval permission from a specific organizational unit user group
   * @param {string} orgUnitUserGroupId
   * @param {string} orderApprovalPermissionCode
   * @param {RequestData} queryParams
   */
  delOrgUserApprovalPermission(orgUnitUserGroupId: string, orderApprovalPermissionCode: string, queryParams?: RequestData) {
    return this.delete<B2BSelectionData>(`${orgUnitUserGroupId}/orderApprovalPermissions/${orderApprovalPermissionCode}`, {
      params: queryParams
    })
  }
}
