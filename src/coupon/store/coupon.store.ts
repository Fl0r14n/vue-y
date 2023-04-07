import { type CustomerCouponSearchPageData, FieldLevelMapping, useCouponResource, usePageable } from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCouponStore = defineStore('CouponStore', () => {
  const couponResource = useCouponResource()
  const { request, sort, pageSize, currentPage } = usePageable()
  const { user, isUser } = storeToRefs(useUserStore())
  const couponsPage = ref<CustomerCouponSearchPageData>()
  const coupons = computed(() => couponsPage.value?.coupons)
  const pagination = computed(() => couponsPage.value?.pagination)
  const sorts = computed(() => couponsPage.value?.sorts)

  const loadCoupons = async () =>
    (couponsPage.value = await couponResource.getCoupons({
      needsTotal: true,
      fields: FieldLevelMapping.FULL,
      ...request.value
    }))

  watch(user, async () => isUser.value && (await loadCoupons()))

  const addNotification = async (couponCode: string) => {
    const result = await couponResource.addCouponNotification(couponCode)
    await loadCoupons()
    return result
  }
  const delNotification = async (couponCode: string) => {
    await couponResource.delCouponNotification(couponCode)
    await loadCoupons()
  }

  return {
    sort,
    pageSize,
    currentPage,
    couponsPage,
    coupons,
    pagination,
    sorts,
    addNotification,
    delNotification
  }
})
