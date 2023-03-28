import type {
  B2BCostCenterData,
  B2BCostCenterListData,
  B2BSelectionData,
  BudgetListData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'

export abstract class CostCenterResource {
  getCostCenters!: (queryParams?: RequestData) => Promise<B2BCostCenterListData>
  addCostCenter!: (costCenter: B2BCostCenterData, queryParams?: RequestData) => Promise<B2BCostCenterData>
  getCostCenter!: (costCenterId: string, queryParams?: RequestData) => Promise<B2BCostCenterData>
  setCostCenter!: (costCenterId: string, costCenter: B2BCostCenterData, queryParams?: RequestData) => Promise<B2BCostCenterData>
  getCostCenterBudgets!: (costCenterId: string, queryParams?: SortableRequestData) => Promise<BudgetListData>
  addCostCenterBudget!: (costCenterId: string, budgetCode: string, queryParams?: RequestData) => Promise<B2BSelectionData>
  delCostCenterBudget!: (costCenterId: string, budgetCode: string) => Promise<B2BSelectionData>
  getAllCostCenters!: (queryParams?: SortableRequestData) => Promise<B2BCostCenterListData>
}

const costCenterResource = (): CostCenterResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(sitePath)
  return {
    getCostCenters: (queryParams?: RequestData) => rest.get<B2BCostCenterListData>(`costcenters`, { params: queryParams }),
    addCostCenter: (costCenter: B2BCostCenterData, queryParams?: RequestData) =>
      rest.post<B2BCostCenterData>(`costcenters/${costCenter}`, { params: queryParams }),
    getCostCenter: (costCenterId: string, queryParams?: RequestData) =>
      rest.get<B2BCostCenterData>(`costcenters/${costCenterId}`, { params: queryParams }),
    setCostCenter: (costCenterId: string, costCenter: B2BCostCenterData, queryParams?: RequestData) =>
      rest.patch<B2BCostCenterData>(`costcenters/${costCenterId}`, costCenter, { params: queryParams }),
    getCostCenterBudgets: (costCenterId: string, queryParams?: SortableRequestData) =>
      rest.get<BudgetListData>(`costcenters/${costCenterId}/budgets`, { params: queryParams }),
    addCostCenterBudget: (costCenterId: string, budgetCode: string, queryParams?: RequestData) =>
      rest.postAt<B2BSelectionData>(
        `costcenters/${costCenterId}/budgets`,
        {},
        {
          params: {
            ...queryParams,
            budgetCode
          }
        }
      ),
    delCostCenterBudget: (costCenterId: string, budgetCode: string) =>
      rest.del<B2BSelectionData>(`costcenters/${costCenterId}/budgets/${budgetCode}`),
    getAllCostCenters: (queryParams?: SortableRequestData) => rest.get<B2BCostCenterListData>(`costcentersall`, { params: queryParams })
  }
}

export const useCostCenterResource = () => inject(CostCenterResource, costCenterResource())
