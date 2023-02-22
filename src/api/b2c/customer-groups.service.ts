import type { MemberListData, PageableRequestData, RequestData, UserGroupData, UserGroupListData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class CustomerGroupsService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/customergroups`
  }

  /**
   * Returns all customer groups that are direct subgroups of a customergroup.
   * To try out the methods of the Customer Groups controller, you must authorize a user who belongs to the “customermanagergroup”.
   * @param {PageableRequestData} queryParams
   */
  getCustomerGroups(queryParams?: PageableRequestData) {
    return this.query<UserGroupListData>({ params: queryParams })
  }

  /**
   * Returns a customer group with a specific groupId.
   * @param {string} groupId. Group identifier
   * @param {RequestData} queryParams
   */
  getCustomerGroup(groupId: string, queryParams?: RequestData) {
    return this.get<UserGroupData>(groupId, { params: queryParams })
  }

  /**
   * Creates a new customer group that is a direct subgroup of a customergroup.
   * @param {UserGroupData} userGroup.
   */
  addCustomerGroup(userGroup: UserGroupData) {
    return this.post<void>(userGroup)
  }

  /**
   * Assigns user(s) to a customer group.
   * @param {string} groupId. Group identifier
   * @param {MemberListData} members
   */
  addCustomerGroupUser(groupId: string, members: MemberListData) {
    return this.patch<void>(`${groupId}/members`, members)
  }

  /**
   * Removes user from a customer group.
   * @param {string} groupId. Group identifier
   * @param {string} userId. User identifier
   */
  delCustomerGroupUser(groupId: string, userId: string) {
    return this.delete<void>(`${groupId}/members/${userId}`)
  }
}
