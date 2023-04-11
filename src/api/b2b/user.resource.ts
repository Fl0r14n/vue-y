import { UserBaseResource, useUserBaseResource } from '@/api/b2c'
import type { OrgUserRegistrationData, RequestData, UserData, UserSignUpData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class UserResource extends UserBaseResource {
  declare addUser: (user: OrgUserRegistrationData | UserSignUpData, queryParams?: RequestData) => Promise<UserData | any>
}

const userResource = (): UserResource => {
  const { sitePath, userPath, orgPrefix, isB2B } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/${orgPrefix('users')}`))
  const userBaseResource = useUserBaseResource()
  return {
    ...userBaseResource,
    getUser: (queryParams?: RequestData) =>
      (isB2B.value && rest.get<UserData>(userPath.value, { params: queryParams })) || userBaseResource.getUser(queryParams),
    addUser: (user: OrgUserRegistrationData | UserSignUpData, queryParams?: RequestData) =>
      (isB2B.value &&
        rest.post<UserData>(user, {
          params: queryParams
        })) ||
      userBaseResource.addUser(user as UserSignUpData, queryParams)
  }
}

export const useUserResource = () => inject(UserResource, userResource())
