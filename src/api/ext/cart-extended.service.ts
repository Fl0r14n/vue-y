import { useRestClient, useRestContext } from '@/api'
import type { CartModificationListData, PaymentDetailsData, PaymentRequestData, PointOfServiceListData, RequestData } from '@/api/models'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class CartExtendedResource {
  getPickupLocations!: (cartId: string, queryParams?: RequestData) => Promise<PointOfServiceListData>
  addPickupLocation!: (cartId: string, storeName: string, queryParams?: RequestData) => Promise<CartModificationListData>
  getPaymentRequest!: (cartId: string, responseUrl: string, extendedMerchantCallback: boolean) => Promise<PaymentRequestData>
  getPaymentResponse!: (cartId: string, queryParams?: RequestData) => Promise<PaymentDetailsData>
  addPaymentResponse!: (cartId: string, queryParams?: RequestData) => Promise<PaymentDetailsData>
  delPaymentResponse!: (cartId: string) => Promise<void>
}

const cartExtendedResource = (): CartExtendedResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/carts`))
  return {
    getPickupLocations: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<PointOfServiceListData>(`${cartId}/consolidate`, { params: queryParams }),
    addPickupLocation: (cartId = 'current', storeName: string, queryParams?: RequestData) =>
      rest.postAt<CartModificationListData>(
        `${cartId}/consolidate`,
        {},
        {
          params: {
            ...queryParams,
            storeName
          }
        }
      ),
    getPaymentRequest: (cartId = 'current', responseUrl: string, extendedMerchantCallback: boolean) =>
      rest.get<PaymentRequestData>(`${cartId}/payment/sop/request`),
    getPaymentResponse: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<PaymentDetailsData>(`${cartId}/payment/sop/response`, { params: queryParams }),
    addPaymentResponse: (cartId = 'current', queryParams?: RequestData) =>
      rest.postAt<PaymentDetailsData>(`${cartId}/payment/sop/response`, {}, { params: queryParams }),
    delPaymentResponse: (cartId = 'current') => rest.del<void>(`${cartId}/payment/sop/response`)
  }
}

export const useCartExtendedResource = () => inject(CartExtendedResource, cartExtendedResource())
