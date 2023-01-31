import type {
  B2BCostCenterData,
  B2BCostCenterListData,
  B2BSelectionData,
  BudgetListData,
  RequestData,
  SortableRequestData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class CostCenterService extends RestClient {
  getEndpoint() {
    return `${this.basePath}`
  }

  /**
   * Returns the list of all active cost centers.
   * @param {RequestData} queryParams
   */
  getCostCenters(queryParams?: RequestData) {
    return this.get<B2BCostCenterListData>(`costcenters`, { params: queryParams })
  }

  /**
   * Creates a new cost center.
   * @param {B2BCostCenterData} costCenter
   * @param {RequestData} queryParams
   */
  addCostCenter(costCenter: B2BCostCenterData, queryParams?: RequestData) {
    return this.post<B2BCostCenterData>(`costcenters/${costCenter}`, { params: queryParams })
  }

  /**
   * Returns a specific cost center based on specific code.
   * The response contains detailed cost center information.
   * @param {string} costCenterId
   * @param {RequestData} queryParams
   */
  getCostCenter(costCenterId: string, queryParams?: RequestData) {
    return this.get<B2BCostCenterData>(`costcenters/${costCenterId}`, { params: queryParams })
  }

  /**
   * Updates a cost center. Only attributes provided in the request body will be changed.
   * @param {string} costCenterId
   * @param {B2BCostCenterData} costCenter
   * @param {RequestData} queryParams
   */
  setCostCenter(costCenterId: string, costCenter: B2BCostCenterData, queryParams?: RequestData) {
    return this.patch<B2BCostCenterData>(`costcenters/${costCenterId}`, costCenter, { params: queryParams })
  }

  /**
   * Returns the list of all budgets, where those budgets, which belong to a specific cost center, are selected.
   * @param {string} costCenterId
   * @param {SortableRequestData} queryParams
   */
  getCostCenterBudgets(costCenterId: string, queryParams?: SortableRequestData) {
    return this.get<BudgetListData>(`costcenters/${costCenterId}/budgets`, { params: queryParams })
  }

  /**
   * Adds a budget to a specific cost center.
   * @param {string} costCenterId
   * @param {string} budgetCode
   * @param {RequestData} queryParams
   */
  addCostCenterBudget(costCenterId: string, budgetCode: string, queryParams?: RequestData) {
    return this.postAt<B2BSelectionData>(
      `costcenters/${costCenterId}/budgets`,
      {},
      {
        params: {
          ...queryParams,
          budgetCode
        }
      }
    )
  }

  /**
   * Removes a budget from a specific cost center.
   * @param {string} costCenterId
   * @param {budgetCode} budgetCode
   */
  delCostCenterBudget(costCenterId: string, budgetCode: string) {
    return this.delete<B2BSelectionData>(`costcenters/${costCenterId}/budgets/${budgetCode}`)
  }

  /**
   * Returns the list of all cost centers.
   * @param {SortableRequestData} queryParams
   */
  getAllCostCenters(queryParams?: SortableRequestData) {
    return this.get<B2BCostCenterListData>(`costcentersall`, { params: queryParams })
  }
}
