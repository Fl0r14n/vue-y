import type {
  AddressData,
  CartData,
  CartListData,
  CartModificationData,
  CartRequestData,
  DeliveryModeData,
  DeliveryModeListData,
  OrderEntryData,
  OrderEntryListData,
  PaymentDetailsData,
  PromotionResultData,
  PromotionResultListData,
  RequestData,
  SortableRequestData,
  VoucherListData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getCartRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/carts`))
}

export abstract class CartBaseAddressResource {
  addDeliveryAddress?: (cartId: string, address: AddressData, queryParams?: RequestData) => Promise<AddressData>
  setDeliveryAddress?: (cartId: string, addressId: string, queryParams?: RequestData) => Promise<void>
  delDeliveryAddress?: (cartId: string) => Promise<void>
}

const cartBaseAddressResource = (): CartBaseAddressResource => {
  const rest = getCartRest()
  return {
    addDeliveryAddress: (cartId = 'current', address: AddressData, queryParams?: RequestData) =>
      rest.postAt<AddressData>(`${cartId}/addresses/delivery`, address, { params: queryParams }),
    setDeliveryAddress: (cartId = 'current', addressId: string, queryParams?: RequestData) =>
      rest.put<void>(
        `${cartId}/addresses/delivery`,
        {},
        {
          params: {
            ...queryParams,
            addressId
          }
        }
      ),
    delDeliveryAddress: (cartId = 'current') => rest.del<void>(`${cartId}/addresses/delivery`)
  }
}

export const useCartBaseAddressResource = () => inject(CartBaseAddressResource, cartBaseAddressResource())

export abstract class CartBaseDeliveryResource {
  getDeliveryModes?: (cartId: string, queryParams?: RequestData) => Promise<DeliveryModeListData>
  getDeliveryMode?: (cartId: string, queryParams?: RequestData) => Promise<DeliveryModeData>
  setDeliveryMode?: (cartId: string, deliveryModeId: string, queryParams?: RequestData) => Promise<void>
  delDeliveryMode?: (cartId: string) => Promise<void>
}

const cartBaseDeliveryResource = (): CartBaseDeliveryResource => {
  const rest = getCartRest()
  return {
    getDeliveryModes: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<DeliveryModeListData>(`${cartId}/deliverymodes`, { params: queryParams }),
    getDeliveryMode: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<DeliveryModeData>(`${cartId}/deliverymode`, { params: queryParams }),
    setDeliveryMode: (cartId = 'current', deliveryModeId: string, queryParams?: RequestData) =>
      rest.put<void>(`${cartId}/deliverymode`, {}, { params: { ...queryParams, deliveryModeId } }),
    delDeliveryMode: (cartId = 'current') => rest.del<void>(`${cartId}/deliverymode`)
  }
}

export const useCartBaseDeliveryResource = () => inject(CartBaseDeliveryResource, cartBaseDeliveryResource())

export abstract class CartBaseEntryResource {
  getEntries?: (cartId: string, queryParams?: RequestData) => Promise<OrderEntryListData>
  addEntry?: (cartId: string, orderEntry: OrderEntryData, queryParams?: RequestData) => Promise<CartModificationData>
  getEntry?: (cartId: string, entryNumber: number, queryParams?: RequestData) => Promise<OrderEntryData>
  setEntry?: (cartId: string, entryNumber: number, orderEntry: OrderEntryData, queryParams?: RequestData) => Promise<CartModificationData>
  delEntry?: (cartId: string, entryNumber: number) => Promise<void>
}

const cartBaseEntryResource = (): CartBaseEntryResource => {
  const rest = getCartRest()
  return {
    getEntries: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<OrderEntryListData>(`${cartId}/entries`, { params: queryParams }),
    addEntry: (cartId = 'current', orderEntry: OrderEntryData, queryParams?: RequestData) =>
      rest.postAt<CartModificationData>(`${cartId}/entries`, orderEntry, { params: queryParams }),
    getEntry: (cartId = 'current', entryNumber: number, queryParams?: RequestData) =>
      rest.get<OrderEntryData>(`${cartId}/entries/${entryNumber}`, { params: queryParams }),
    setEntry: (cartId = 'current', entryNumber: number, orderEntry: OrderEntryData, queryParams?: RequestData) =>
      rest.patch<CartModificationData>(`${cartId}/entries/${entryNumber}`, orderEntry, { params: queryParams }),
    delEntry: (cartId = 'current', entryNumber: number) => rest.del<void>(`${cartId}/entries/${entryNumber}`)
  }
}

export const useCartBaseEntryResource = () => inject(CartBaseEntryResource, cartBaseEntryResource())

export abstract class CartBaseEntryGroupResource {
  addEntryGroup?: (
    cartId: string,
    entryGroupNumber: number,
    orderEntry: OrderEntryData,
    queryParams?: RequestData
  ) => Promise<CartModificationData>
  delEntryGroup?: (cartId: string, entryGroupNumber: number) => Promise<void>
}

const cartBaseEntryGroupResource = (): CartBaseEntryGroupResource => {
  const rest = getCartRest()
  return {
    addEntryGroup: (cartId = 'current', entryGroupNumber: number, orderEntry: OrderEntryData, queryParams?: RequestData) =>
      rest.postAt<CartModificationData>(`${cartId}/entrygroups/${entryGroupNumber}`, orderEntry, { params: queryParams }),
    delEntryGroup: (cartId = 'current', entryGroupNumber: number) => rest.del<void>(`${cartId}/entrygroups/${entryGroupNumber}`)
  }
}

export const useCartBaseEntryGroupResource = () => inject(CartBaseEntryGroupResource, cartBaseEntryGroupResource())

export abstract class CartBasePaymentResource {
  addPaymentDetails?: (cartId: string, paymentDetails: PaymentDetailsData, queryParams?: RequestData) => Promise<PaymentDetailsData>
  setPaymentDetails?: (cartId: string, paymentDetailsId: string, queryParams?: RequestData) => Promise<void>
}

const cartBasePaymentResource = (): CartBasePaymentResource => {
  const rest = getCartRest()
  return {
    addPaymentDetails: (cartId = 'current', paymentDetails: PaymentDetailsData, queryParams?: RequestData) =>
      rest.postAt<PaymentDetailsData>(`${cartId}/paymentdetails`, paymentDetails, { params: queryParams }),
    setPaymentDetails: (cartId = 'current', paymentDetailsId: string, queryParams?: RequestData) =>
      rest.put<void>(
        `${cartId}/paymentdetails`,
        {},
        {
          params: {
            ...queryParams,
            paymentDetailsId
          }
        }
      )
  }
}

export const useCartBasePaymentResource = () => inject(CartBasePaymentResource, cartBasePaymentResource())

export abstract class CartBasePromotionResource {
  getPromotions?: (cartId: string, queryParams?: RequestData) => Promise<PromotionResultListData>
  addPromotion?: (cartId: string, promotionId: string, queryParams?: RequestData) => Promise<void>
  getPromotion?: (cartId: string, promotionId: string, queryParams?: RequestData) => Promise<PromotionResultData>
  delPromotion?: (cartId: string, promotionId: string) => Promise<void>
  getVouchers?: (cartId: string, queryParams?: RequestData) => Promise<VoucherListData>
  addVoucher?: (cartId: string, voucherId: string, queryParams?: RequestData) => Promise<void>
  delVoucher?: (cartId: string, voucherId: string) => Promise<void>
}

const cartBasePromotionResource = (): CartBasePromotionResource => {
  const rest = getCartRest()
  return {
    getPromotions: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<PromotionResultListData>(`${cartId}/promotions`, { params: queryParams }),
    addPromotion: (cartId = 'current', promotionId: string, queryParams?: RequestData) =>
      rest.postAt<void>(
        `${cartId}/promotions`,
        {},
        {
          params: {
            ...queryParams,
            promotionId
          }
        }
      ),
    getPromotion: (cartId = 'current', promotionId: string, queryParams?: RequestData) =>
      rest.get<PromotionResultData>(`${cartId}/promotions/${promotionId}`, { params: queryParams }),
    delPromotion: (cartId = 'current', promotionId: string) => rest.del<void>(`${cartId}/promotions/${promotionId}`),
    getVouchers: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<VoucherListData>(`${cartId}/vouchers`, { params: queryParams }),
    addVoucher: (cartId = 'current', voucherId: string, queryParams?: RequestData) =>
      rest.postAt<void>(
        `${cartId}/vouchers`,
        {},
        {
          params: {
            ...queryParams,
            voucherId
          }
        }
      ),
    delVoucher: (cartId = 'current', voucherId: string) => rest.del<void>(`${cartId}/vouchers/${voucherId}`)
  }
}

export const useCartBasePromotionResource = () => inject(CartBasePromotionResource, cartBasePromotionResource())

export abstract class CartBaseResource {
  getCarts?: (queryParams?: { savedCartsOnly?: boolean } & SortableRequestData) => Promise<CartListData>
  addCart?: (queryParams?: CartRequestData) => Promise<CartData>
  getCart?: (cartId: string, queryParams?: RequestData) => Promise<CartData>
  delCart?: (cartId: string) => Promise<void>
  setEmail?: (cartId: string, email: string, queryParams?: RequestData) => Promise<void>
}

const cartBaseResource = (): CartBaseResource => {
  const rest = getCartRest()
  return {
    getCarts: (queryParams?: { savedCartsOnly?: boolean } & SortableRequestData) => rest.query<CartListData>({ params: queryParams }),
    addCart: (queryParams?: CartRequestData) => rest.post<CartData>({}, { params: queryParams }),
    getCart: (cartId = 'current', queryParams?: RequestData) => rest.get<CartData>(cartId, { params: queryParams }),
    delCart: (cartId = 'current') => rest.del<void>(cartId),
    setEmail: (cartId = 'current', email: string, queryParams?: RequestData) =>
      rest.put<void>(
        `${cartId}/email`,
        {},
        {
          params: {
            ...queryParams,
            email
          }
        }
      )
  }
}

export const useCartBaseResource = () => inject(CartBaseResource, cartBaseResource())
