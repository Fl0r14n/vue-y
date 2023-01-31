import type { BudgetData, BudgetListData, RequestData, SortableRequestData } from '@/yapi/models'
import { AuthRestClient } from '@/yapi/rest'

export class BudgetService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/budgets`
  }

  /**
   * Gets the list of budgets for a specified base store
   * Returns the list of budgets accessible to a specified user for a specified base store.
   * The response can display the results across multiple pages, if required.
   * @param {SortableRequestData} queryParams
   */
  getBudgets(queryParams?: SortableRequestData) {
    return this.query<BudgetListData>({ params: queryParams })
  }

  /**
   * Creates a new budget
   * @param {BudgetData} budget
   * @param {RequestData} queryParams
   */
  addBudget(budget: BudgetData, queryParams?: RequestData) {
    return this.post<BudgetData>(budget, { params: queryParams })
  }

  /**
   * Gets specific budget details accessible to a specified user for a specified base store based on budget code
   * Returns specific budget details accessible to a specified user for a specified base store based on budget code.
   * The response contains detailed order information.
   * @param {string} code
   * @param {RequestData} queryParams
   */
  getBudget(code: string, queryParams?: RequestData) {
    return this.get<BudgetData>(code, { params: queryParams })
  }

  /**
   * Updates the budget
   * Updates the budget. Only attributes provided in the request body will be changed.
   * @param {string} code
   * @param {BudgetData} budget
   * @param {RequestData} queryParams
   */
  setBudget(code: string, budget: BudgetData, queryParams?: RequestData) {
    return this.patch<BudgetData>(code, budget, { params: queryParams })
  }
}
