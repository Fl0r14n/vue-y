import type { BudgetData, BudgetListData, RequestData, SortableRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getBudgetRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/budgets`))
}

export abstract class BudgetResource {
  getBudgets!: (queryParams?: SortableRequestData) => Promise<BudgetListData>
  addBudget!: (budget: BudgetData, queryParams?: RequestData) => Promise<BudgetData>
  getBudget!: (code: string, queryParams?: RequestData) => Promise<BudgetData>
  setBudget!: (code: string, budget: BudgetData, queryParams?: RequestData) => Promise<BudgetData>
}

const budgetResource = (): BudgetResource => {
  const rest = getBudgetRest()
  return {
    getBudgets: (queryParams?: SortableRequestData) => rest.query<BudgetListData>({ params: queryParams }),
    addBudget: (budget: BudgetData, queryParams?: RequestData) => rest.post<BudgetData>(budget, { params: queryParams }),
    getBudget: (code: string, queryParams?: RequestData) => rest.get<BudgetData>(code, { params: queryParams }),
    setBudget: (code: string, budget: BudgetData, queryParams?: RequestData) =>
      rest.patch<BudgetData>(code, budget, { params: queryParams })
  }
}

export const useBudgetResource = () => inject(BudgetResource, budgetResource())
