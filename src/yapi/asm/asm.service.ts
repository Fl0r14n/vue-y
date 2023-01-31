import type {
  CustomerListData,
  CustomerSearchPageData,
  CustomerSearchRequestData,
  CustomerSuggestionData,
  UserGroupListData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class AsmService extends RestClient {
  getEndpoint() {
    const { api, asm } = this.config.value
    return `${api?.host}${asm?.path}`
  }

  /**
   * Binds customer with provided id to cart if it's anonymous cart
   * @param {string} customerId
   * @param {string} cartId
   */
  bindCart(customerId: string, cartId: string) {
    return this.postAt<string>(
      `customers`,
      {},
      {
        baseSite: this.siteId,
        customerId,
        cartId
      }
    )
  }

  /**
   * This endpoint returns list of all customer lists. This can only be done when logged in
   */
  getUserGroups() {
    return this.get<UserGroupListData>(`customerlists`, { baseSite: this.siteId })
  }

  /**
   * Returns single customer list details
   * This endpoint returns details of customer list with valid Id
   * @param {string} userGroupId
   */
  getCustomers(userGroupId: string) {
    return this.get<CustomerListData>(`customerlists/${userGroupId}`, { baseSite: this.siteId })
  }

  /**
   * Returns customers to auto complete based on customerQuery parameter
   * @param {string} customerQuery
   */
  suggestCustomers(customerQuery: string) {
    return this.get<CustomerSuggestionData[]>(`/customers/autocomplete`, {
      baseSite: this.siteId,
      customerQuery
    })
  }

  /**
   * This endpoint returns paginated list of customers based
   * on provided query parameters. If query term is present
   * it will return customers based on provided value.
   * If customerListId is present it will ignore query
   * term and return only customers who belong to the
   * given customer list. If orderId parameter is
   * present it will ignore previous parameters,
   * and it will return customer associated to
   * the given order.This can only be done by
   * the logged-in user.
   * @param {CustomerSearchRequestData} queryParams
   */
  searchCustomers(queryParams: CustomerSearchRequestData) {
    return this.get<CustomerSearchPageData>(`customers/search`, {
      params: {
        ...{ baseSite: this.siteId },
        ...queryParams
      }
    })
  }
}
