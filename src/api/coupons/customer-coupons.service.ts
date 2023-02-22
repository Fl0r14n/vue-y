import type {
  CustomerCoupon2CustomerData,
  CustomerCouponNotificationData,
  CustomerCouponSearchPageData,
  RequestData,
  WithTotalRequestData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class CustomerCouponsService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/customercoupons`
  }

  /**
   * Gets the customer coupon list of the current customer.
   * @param {WithTotalRequestData} queryParams
   */
  getCoupons(queryParams?: WithTotalRequestData) {
    return this.query<CustomerCouponSearchPageData>({ params: queryParams })
  }

  /**
   * Claims a customer coupon by coupon code.
   * @param {string} couponCode
   * @param {RequestData} queryParams
   */
  addCoupon(couponCode: string, queryParams?: RequestData) {
    return this.postAt<CustomerCoupon2CustomerData>(`${couponCode}/claim`, {}, { params: queryParams })
  }

  /**
   * Make a subscription to a customer coupon to receive notifications when it will be in effect soon, or will expire soon.
   * @param {string} couponCode
   * @param {RequestData} queryParams
   */
  addCouponNotification(couponCode: string, queryParams?: RequestData) {
    return this.postAt<CustomerCouponNotificationData>(`${couponCode}/notification`, {}, { params: queryParams })
  }

  /**
   * Removes notification subscription from the specific customer coupon.
   * @param {string} couponCode
   */
  delCouponNotification(couponCode: string) {
    return this.delete<void>(`${couponCode}/notification`)
  }
}
