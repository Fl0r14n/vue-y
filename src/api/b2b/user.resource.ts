import { UserBaseService } from '@/api/b2c'
import type { OrgUserRegistrationData, RequestData, UserData, UserSignUpData } from '@/api/models'
import type { RequestOptions } from '@/api/rest'

export class UserResource extends UserBaseService {
  override getEndpoint(options?: RequestOptions) {
    return options?.['isOrg'] ? `${this.basePath}/${this.orgPrefix('users')}` : super.getEndpoint()
  }

  /**
   * Returns customer profile.
   * @param {RequestData} queryParams
   */
  override getUser(queryParams?: RequestData) {
    return this.get<UserData>(this.userPath, {
      params: queryParams,
      isOrg: this.isB2B
    })
  }

  /**
   * Create a registration request for a B2B user.
   * @param {OrgUserRegistrationData} user
   * @param {RequestData} queryParams
   */
  override addUser(user: OrgUserRegistrationData | UserSignUpData, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.post<UserData | any>(user, {
          params: queryParams,
          isOrg: true
        })) ||
      super.addUser(user as UserSignUpData, queryParams)
    )
  }
}
