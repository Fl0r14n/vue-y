import type { BudgetListData } from '@/api'
import { FieldLevelMapping, useCostCenterResource, usePageable } from '@/api'
import { useCostCenterStore } from '@/cost-center'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCostCenterBudgetStore = defineStore('CostCenterBudgetStore', () => {
  const constCenterResource = useCostCenterResource()
  const { code } = storeToRefs(useCostCenterStore())
  const { request, sort, pageSize, currentPage } = usePageable()
  const budgetsPage = ref<BudgetListData>()
  const budgets = computed(() => budgetsPage.value?.budgets)
  const sorts = computed(() => budgetsPage.value?.sorts)
  const pagination = computed(() => budgetsPage.value?.pagination)

  watch(code, () => loadBudgets())

  const loadBudgets = async () =>
    code.value &&
    (budgetsPage.value = await constCenterResource.getCostCenterBudgets(code.value, {
      fields: FieldLevelMapping.FULL,
      ...request.value
    }))

  const create = async (budgetCode: string) => {
    const { value } = code
    if (value) {
      const result = await constCenterResource.addCostCenterBudget(value, budgetCode, {
        fields: FieldLevelMapping.FULL
      })
      await loadBudgets()
      return result
    }
  }

  const remove = async (budgetCode: string) => {
    const { value } = code
    if (value) {
      await constCenterResource.delCostCenterBudget(value, budgetCode)
      await loadBudgets()
    }
  }

  return {
    budgetsPage,
    budgets,
    sorts,
    pagination,
    sort,
    pageSize,
    currentPage,
    create,
    remove
  }
})
