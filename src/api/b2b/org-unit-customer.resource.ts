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
import { AuthRestClient } from '@/api/rest'

export class OrgUnitCustomerResource extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/orgCustomers`
  }

  /**
   * Returns the list of org customers for a specified base store.
   * The response can display the results across multiple pages, if required.
   * @param {SortableRequestData} queryParams
   */
  getOrgCustomers(queryParams?: SortableRequestData) {
    return this.query<OrgUnitUserListData>({ params: queryParams })
  }

  /**
   * Creates a new organizational customer
   * @param {OrgCustomerCreationData} orgCustomer
   * @param {RequestData} queryParams
   */
  addOrgCustomer(orgCustomer: OrgCustomerCreationData, queryParams?: RequestData) {
    return this.post<UserData>(orgCustomer, { params: queryParams })
  }

  /**
   * Returns a org customer profile.
   * @param {string} orgCustomerId
   * @param {RequestData} queryParams
   */
  getOrgCustomer(orgCustomerId: string, queryParams?: RequestData) {
    return this.get<UserData>(orgCustomerId, { params: queryParams })
  }

  /**
   * Updates org customer profile. Only attributes provided in the request body will be changed.
   * @param {string} orgCustomerId
   * @param {OrgCustomerCreationData} orgCustomer
   * @param {RequestData} queryParams
   */
  setOrgCustomer(orgCustomerId: string, orgCustomer: OrgCustomerCreationData, queryParams?: RequestData) {
    return this.patch<OrgCustomerModificationData>(orgCustomerId, orgCustomer, { params: queryParams })
  }

  /**
   * Returns the list of approvers for a specified org customer.
   * The response can display the results across multiple pages, if required.
   * @param {string} orgCustomerId
   * @param {SortableRequestData} queryParams
   */
  getOrgCustomerApprovers(orgCustomerId: string, queryParams?: SortableRequestData) {
    return this.get<OrgUnitUserListData>(`${orgCustomerId}/approvers`, { params: queryParams })
  }

  /**
   * Add an approver to an specific org customer
   * @param {string} orgCustomerId
   * @param {string} approverId
   * @param {RequestData} queryParams
   */
  addOrgCustomerApprover(orgCustomerId: string, approverId: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(`${orgCustomerId}/approvers/${approverId}`, null, { params: queryParams })
  }

  /**
   * Deletes an approver from an specific org customer with the provided approverId
   * @param {string} orgCustomerId
   * @param {string} approverId
   * @param {RequestData} queryParams
   */
  delOrgCustomerApprover(orgCustomerId: string, approverId: string, queryParams?: RequestData) {
    return this.delete<B2BSelectionData>(`${orgCustomerId}/approvers/${approverId}`, { params: queryParams })
  }

  /**
   * Returns the list of org user groups for a specified org customer.
   * The response can display the results across multiple pages, if required.
   * @param {string} orgCustomerId
   * @param {SortableRequestData} queryParams
   */
  getOrgCustomerGroups(orgCustomerId: string, queryParams?: SortableRequestData) {
    return this.get<OrgUnitUserGroupListData>(`${orgCustomerId}/orgUserGroups`, { params: queryParams })
  }

  /**
   * Add an org user group to an specific org customer
   * @param {string} orgCustomerId
   * @param {string} userGroupId
   * @param {RequestData} queryParams
   */
  addOrgCustomerGroup(orgCustomerId: string, userGroupId: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(`${orgCustomerId}/orgUserGroups/${userGroupId}`, null, { params: queryParams })
  }

  /**
   * Deletes an org user group from a specific org customer with the provided orgUserGroupId
   * @param {string} orgCustomerId
   * @param {string} userGroupId
   */
  delOrgCustomerGroup(orgCustomerId: string, userGroupId: string) {
    return this.delete<void>(`${orgCustomerId}/orgUserGroups/${userGroupId}`)
  }

  /**
   * Returns the list of permissions for a user.
   * The response can display the results across multiple pages, if required.
   * @param {string} orgCustomerId
   * @param {SortableRequestData} queryParams
   */
  getOrgCustomerPermissions(orgCustomerId: string, queryParams?: SortableRequestData) {
    return this.get<OrgUnitUserGroupListData>(`${orgCustomerId}/permissions`, { params: queryParams })
  }

  /**
   * Add a permission to a specific org customer
   * @param {string} orgCustomerId
   * @param {string} permissionId
   * @param {RequestData} queryParams
   */
  addOrgCustomerPermission(orgCustomerId: string, permissionId: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(`${orgCustomerId}/permissions/${permissionId}`, null, { params: queryParams })
  }

  /**
   * Deletes a permission from a specific org customer with the provided permissionId
   * @param {string} orgCustomerId
   * @param {string} permissionId
   * @param {RequestData} queryParams
   */
  delOrgCustomerPermission(orgCustomerId: string, permissionId: string, queryParams?: RequestData) {
    return this.delete<B2BSelectionData>(`${orgCustomerId}/permissions/${permissionId}`, { params: queryParams })
  }
}
