import type { MemberListData, PageableRequestData, RequestData, UserGroupData, UserGroupListData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class CustomerGroupsResource {
  getCustomerGroups!: (queryParams?: PageableRequestData) => Promise<UserGroupListData>
  getCustomerGroup!: (groupId: string, queryParams?: RequestData) => Promise<UserGroupData>
  addCustomerGroup!: (userGroup: UserGroupData) => Promise<void>
  addCustomerGroupUser!: (groupId: string, members: MemberListData) => Promise<void>
  delCustomerGroupUser!: (groupId: string, userId: string) => Promise<void>
}

const customerGroupsResource = (): CustomerGroupsResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/customergroups`))
  return {
    getCustomerGroups: (queryParams?: PageableRequestData) => rest.query<UserGroupListData>({ params: queryParams }),
    getCustomerGroup: (groupId: string, queryParams?: RequestData) => rest.get<UserGroupData>(groupId, { params: queryParams }),
    addCustomerGroup: (userGroup: UserGroupData) => rest.post<void>(userGroup),
    addCustomerGroupUser: (groupId: string, members: MemberListData) => rest.patch<void>(`${groupId}/members`, members),
    delCustomerGroupUser: (groupId: string, userId: string) => rest.del<void>(`${groupId}/members/${userId}`)
  }
}

export const useCustomerGroupsResource = () => inject(CustomerGroupsResource, customerGroupsResource())
