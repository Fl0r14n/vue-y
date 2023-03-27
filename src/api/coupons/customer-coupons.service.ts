import type {
  CustomerCoupon2CustomerData,
  CustomerCouponNotificationData,
  CustomerCouponSearchPageData,
  RequestData,
  WithTotalRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class CustomerCouponsResource {
  getCoupons!: (queryParams?: WithTotalRequestData) => Promise<CustomerCouponSearchPageData>
  addCoupon!: (couponCode: string, queryParams?: RequestData) => Promise<CustomerCoupon2CustomerData>
  addCouponNotification!: (couponCode: string, queryParams?: RequestData) => Promise<CustomerCouponNotificationData>
  delCouponNotification!: (couponCode: string) => Promise<void>
}

const customerCouponsResource = (): CustomerCouponsResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/customercoupons`))
  return {
    getCoupons: (queryParams?: WithTotalRequestData) => rest.query<CustomerCouponSearchPageData>({ params: queryParams }),
    addCoupon: (couponCode: string, queryParams?: RequestData) =>
      rest.postAt<CustomerCoupon2CustomerData>(`${couponCode}/claim`, {}, { params: queryParams }),
    addCouponNotification: (couponCode: string, queryParams?: RequestData) =>
      rest.postAt<CustomerCouponNotificationData>(`${couponCode}/notification`, {}, { params: queryParams }),
    delCouponNotification: (couponCode: string) => rest.del<void>(`${couponCode}/notification`)
  }
}

export const useCustomerCouponsResource = () => inject(CustomerCouponsResource, customerCouponsResource())
