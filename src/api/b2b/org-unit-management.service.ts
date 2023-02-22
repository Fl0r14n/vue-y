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
import { AuthRestClient } from '@/api/rest'

export class OrgUnitManagementService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}`
  }

  /**
   * Returns list of available organizational unit nodes.
   * @param {RequestData} queryParams
   */
  getOrgUnits(queryParams?: RequestData) {
    return this.get<B2BUnitNodeListData>(`availableOrgUnitNodes`, { params: queryParams })
  }

  /**
   * Adds a role to a specific organizational customer
   * @param {string} orgCustomerId
   * @param {string} roleId The role which is added to the organizational customer.
   * Example roles are: b2badmingroup, b2bmanagergroup, b2bcustomergroup
   * @param {RequestData} queryParams
   */
  addOrgCustomerRole(orgCustomerId: string, roleId: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(
      `orgCustomers/${orgCustomerId}/roles`,
      {},
      {
        params: {
          ...queryParams,
          roleId
        }
      }
    )
  }

  /**
   * Removes a role from a specific organizational customer
   * @param {string} orgCustomerId
   * @param {string} roleId
   * @param {RequestData} queryParams
   */
  delOrgCustomerRole(orgCustomerId: string, roleId: string, queryParams?: RequestData) {
    return this.delete<B2BSelectionData>(`orgCustomers/${orgCustomerId}/roles/${roleId}`, { params: queryParams })
  }

  /**
   * Creates a new organizational unit.
   * @param {B2BUnitData} orgUnit
   * @param {RequestData} queryParams
   */
  addOrgUnit(orgUnit: B2BUnitData, queryParams?: RequestData) {
    return this.postAt<B2BUnitData>(`orgUnits`, orgUnit, { params: queryParams })
  }

  /**
   * Returns a specific organizational unit based on specific id.
   * The response contains detailed organizational unit information.
   * @param {string} orgUnitId
   * @param {RequestData} queryParams
   */
  getOrgUnit(orgUnitId: string, queryParams?: RequestData) {
    return this.get<B2BUnitData>(`orgUnits/${orgUnitId}`, { params: queryParams })
  }

  /**
   * Updates the organizational unit. Only attributes provided in the request body will be changed.
   * @param {string} orgUnitId
   * @param {B2BUnitData} orgUnit
   * @param {RequestData} queryParams
   */
  setOrgUnit(orgUnitId: string, orgUnit: B2BUnitData, queryParams?: RequestData) {
    return this.patch<B2BUnitData>(`orgUnits/${orgUnitId}`, orgUnit, { params: queryParams })
  }

  /**
   * Retrieves organizational unit addresses
   * @param {string} orgUnitId
   * @param {RequestData} queryParams
   */
  getOrgUnitAddresses(orgUnitId: string, queryParams?: RequestData) {
    return this.get<AddressListData>(`orgUnits/${orgUnitId}/addresses`, { params: queryParams })
  }

  /**
   * Creates a new organizational unit address
   * @param {string} orgUnitId
   * @param {AddressData} address
   * @param {RequestData} queryParams
   */
  addOrgUnitAddress(orgUnitId: string, address: AddressData, queryParams?: RequestData) {
    return this.postAt<AddressData>(`orgUnits/${orgUnitId}/addresses`, address, { params: queryParams })
  }

  /**
   * Removes the organizational unit address.
   * @param {string} orgUnitId
   * @param {string} addressId
   */
  delOrgUnitAddress(orgUnitId: string, addressId: string) {
    return this.delete<void>(`orgUnits/${orgUnitId}/addresses/${addressId}`)
  }

  /**
   * Updates the organizational unit address. Only attributes provided in the request body will be changed.
   * @param {string} orgUnitId
   * @param {string} addressId
   * @param {AddressData} address
   */
  setOrgUnitAddress(orgUnitId: string, addressId: string, address: AddressData) {
    return this.patch<void>(`orgUnits/${orgUnitId}/addresses/${addressId}`, address)
  }

  /**
   * Returns a list of parent units for which the unit with id can be assigned as a child.
   * @param {string} orgUnitId
   * @param {RequestData} queryParams
   */
  getOrgUnitParents(orgUnitId: string, queryParams?: RequestData) {
    return this.get<B2BUnitNodeListData>(`orgUnits/${orgUnitId}/availableParents`, { params: queryParams })
  }

  /**
   * Returns list of users which belongs to the organizational unit and can be assigned to a specific role.
   * Users who are already assigned to the role are flagged by ‘selected’ attribute.
   * @param {string} orgUnitId
   * @param {string} roleId Filtering parameter which is used to return a specific role.
   * Example roles are: b2bapprovergroup, b2badmingroup, b2bmanagergroup, b2bcustomergroup
   * @param {SortableRequestData} queryParams
   */
  getOrgUnitUsers(orgUnitId: string, roleId: string, queryParams?: SortableRequestData) {
    return this.get<OrgUnitUserListData>(`orgUnits/${orgUnitId}/availableUsers/${roleId}`, { params: queryParams })
  }

  /**
   * Adds an organizational unit dependent role to a specific organizational customer
   * @param {string} orgUnitId
   * @param {string} orgCustomerId
   * @param {string} roleId
   */
  addOrgUnitCustomerRole(orgUnitId: string, orgCustomerId: string, roleId: string) {
    return this.postAt<void>(`orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles`, {}, { params: { roleId } })
  }

  /**
   * Removes an organizational unit dependent role from a specific organizational customer.
   * @param {string} orgUnitId
   * @param {string} orgCustomerId
   * @param {string} roleId
   */
  delOrgUnitCustomerRole(orgUnitId: string, orgCustomerId: string, roleId: string) {
    return this.delete<void>(`orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles/${roleId}`)
  }

  /**
   * Returns list of available approval business processes.
   * @param {RequestData} queryParams
   */
  getOrgUnitApprovals(queryParams?: RequestData) {
    return this.get<B2BApprovalProcessListData>(`orgUnitsAvailableApprovalProcesses`, { params: queryParams })
  }

  /**
   * Returns the root organizational unit node.
   * The response contains detailed organizational unit node information and the child nodes associated to it.
   * @param {RequestData} queryParams
   */
  getOrgUnitRoot(queryParams?: RequestData) {
    return this.get<B2BUnitNodeData>(`orgUnitsRootNodeTree`, { params: queryParams })
  }
}
