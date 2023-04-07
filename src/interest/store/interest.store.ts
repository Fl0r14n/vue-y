import {
  type CustomerInterestsSearchPageData,
  FieldLevelMapping,
  type ProductInterestRequestData,
  usePageable,
  useProductInterestResource
} from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useInterestStore = defineStore('InterestStore', () => {
  const productInterestResource = useProductInterestResource()
  const { request, sort, pageSize, currentPage } = usePageable()
  const { user, isUser } = storeToRefs(useUserStore())
  const interestsPage = ref<CustomerInterestsSearchPageData>()
  const interests = computed(() => interestsPage.value?.results)
  const pagination = computed(() => interestsPage.value?.pagination)
  const sorts = computed(() => interestsPage.value?.sorts)

  const loadInterests = async () =>
    (interestsPage.value = await productInterestResource.getProductInterests({
      needsTotal: true,
      fields: FieldLevelMapping.FULL,
      ...request.value
    }))

  watch(user, async () => isUser.value && (await loadInterests()))

  const hasInterest = (interest: ProductInterestRequestData) =>
    productInterestResource
      .getProductInterests(interest)
      .then(v => v.results)
      .then(v => !!v.length)

  const addInterest = async (interest: ProductInterestRequestData) => {
    await productInterestResource.addProductInterests(interest)
    await loadInterests()
  }

  const delInterest = async (interest: ProductInterestRequestData) => {
    await productInterestResource.delProductInterests(interest)
    await loadInterests()
  }

  return {
    sort,
    pageSize,
    currentPage,
    interestsPage,
    interests,
    pagination,
    sorts,
    hasInterest,
    addInterest,
    delInterest
  }
})
