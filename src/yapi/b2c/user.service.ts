import type { RequestData, UserData, UserGroupListData, UserSignUpData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class UserBaseService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users`
  }

  /**
   * Registers a customer. The following two sets of parameters are available:<br/>
   * * First set is used to register a customer. In this case the required parameters are: <br>
   * * * login, password, firstName, lastName, titleCode.<br/>
   * * Second set is used to convert a guest to a customer. In this case the required parameters are:<br/>
   * * * guid, password.
   * @param {UserSignUpData} user
   * @param {RequestData} queryParams
   */
  addUser(user: UserSignUpData, queryParams?: RequestData) {
    return this.post<UserData>(user, { params: queryParams })
  }

  /**
   * Returns customer profile.
   * @param {RequestData} queryParams
   */
  getUser(queryParams?: RequestData) {
    return this.get<UserData>(this.userPath, { params: queryParams })
  }

  /**
   * Updates customer profile. Only attributes provided in the request body will be changed.
   * @param {UserData} user
   */
  setUser(user: UserData) {
    return this.patch<void>(this.userPath, user)
  }

  /**
   * Removes customer profile.
   */
  delUser() {
    return this.delete<void>(this.userPath)
  }

  /**
   * Returns all customer groups of a customer.
   * @param {RequestData} queryParams
   */
  getCustomerGroups(queryParams?: RequestData) {
    return this.get<UserGroupListData>(`${this.userPath}/customergroups`, { params: queryParams })
  }

  /**
   * Changes customer's login.
   * @param {{password: string; newLogin: string}} login
   */
  setLogin(login: {
    /**
     * Customer's current password.
     */
    password: string
    /**
     * Customer's new login. Customer login is case-insensitive.
     */
    newLogin: string
  }) {
    return this.put<void>(`${this.userPath}/login`, {}, { params: login })
  }

  /**
   * Changes customer's password.
   * @param {{new: string; old: string}} password
   */
  setPassword(password: {
    /**
     * New password
     */
    new: string
    /**
     * Old password. Required only for ROLE_CUSTOMERGROUP
     */
    old: string
  }) {
    return this.put<void>(`${this.userPath}/password`, {}, { params: password })
  }
}
