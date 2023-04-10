import type { B2BCostCenterListData } from '@/api'
import { type B2BCostCenterData, FieldLevelMapping, useCostCenterResource, usePageable } from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCostCenterStore = defineStore('CostCenterStore', () => {
  const costCenterResource = useCostCenterResource()
  const { request, sort, pageSize, currentPage } = usePageable()
  const { user, isUser } = storeToRefs(useUserStore())
  const costCentersPage = ref<B2BCostCenterListData>()
  const costCenters = computed(() => costCentersPage.value?.costCenters)
  const sorts = computed(() => costCentersPage.value?.sorts)
  const pagination = computed(() => costCentersPage.value?.pagination)
  const costCenter = ref<B2BCostCenterData>()
  const code = computed({
    get: () => costCenter.value?.code,
    set: async code =>
      code &&
      (costCenter.value = await costCenterResource.getCostCenter(code, {
        fields: FieldLevelMapping.FULL
      }))
  })
  const costCenterUnit = computed(() => costCenter.value?.unit)
  const costCenterUnitAddresses = computed(() => costCenterUnit.value?.addresses)

  watch(user, async () => isUser.value && (await loadCostCenters()))

  const loadCostCenters = async () =>
    (costCentersPage.value = await costCenterResource.getCostCenters({
      fields: FieldLevelMapping.FULL,
      ...request.value
    }))

  const create = async (body: B2BCostCenterData) => {
    costCenter.value = await costCenterResource.addCostCenter(body, {
      fields: FieldLevelMapping.FULL
    })
    await loadCostCenters()
  }

  const update = async (body: B2BCostCenterData) => {
    const { value } = code
    if (value) {
      costCenter.value = await costCenterResource.setCostCenter(value, body, {
        fields: FieldLevelMapping.FULL
      })
      await loadCostCenters()
    }
  }

  return {
    costCentersPage,
    costCenters,
    sorts,
    pagination,
    sort,
    pageSize,
    currentPage,
    costCenter,
    code,
    costCenterUnit,
    costCenterUnitAddresses,
    create,
    update
  }
})
