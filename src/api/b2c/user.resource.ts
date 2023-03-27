import type { RequestData, UserData, UserGroupListData, UserSignUpData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class UserBaseResource {
  addUser!: (user: UserSignUpData, queryParams?: RequestData) => Promise<UserData>
  getUser!: (queryParams?: RequestData) => Promise<UserData>
  setUser!: (user: UserData) => Promise<void>
  delUser!: () => Promise<void>
  getCustomerGroups!: (queryParams?: RequestData) => Promise<UserGroupListData>
  setLogin!: (login: { password: string; newLogin: string }) => Promise<void>
  setPassword!: (password: { new: string; old: string }) => Promise<void>
}

const userBaseResource = (): UserBaseResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users`))
  return {
    addUser: (user: UserSignUpData, queryParams?: RequestData) => rest.post<UserData>(user, { params: queryParams }),
    getUser: (queryParams?: RequestData) => rest.get<UserData>(userPath.value, { params: queryParams }),
    setUser: (user: UserData) => rest.patch<void>(userPath.value, user),
    delUser: () => rest.del<void>(userPath.value),
    getCustomerGroups: (queryParams?: RequestData) =>
      rest.get<UserGroupListData>(`${userPath.value}/customergroups`, { params: queryParams }),
    setLogin: (login: { password: string; newLogin: string }) => rest.put<void>(`${userPath.value}/login`, {}, { params: login }),
    setPassword: (password: { new: string; old: string }) => rest.put<void>(`${userPath.value}/password`, {}, { params: password })
  }
}

export const useUserBaseResource = () => inject(UserBaseResource, userBaseResource())
