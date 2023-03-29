import {
  CartBaseEntryGroupResource,
  CartBaseEntryResource,
  CartBasePaymentResource,
  CartBasePromotionResource,
  CartBaseResource,
  CartExtendedResource,
  getCartRest,
  useCartBaseDeliveryResource,
  useCartBaseEntryGroupResource,
  useCartBaseEntryResource,
  useCartBasePaymentResource,
  useCartBasePromotionResource,
  useCartBaseResource,
  useCartExtendedResource,
  useRestClient,
  useRestContext
} from '@/api'
import { CartBaseAddressResource, CartBaseDeliveryResource, useCartBaseAddressResource } from '@/api/b2c'
import type { B2BPaymentType, CartData, CartModificationData, OrderEntryData, OrderEntryListData, RequestData } from '@/api/models'
import { inject } from '@/config'
import { computed } from 'vue'

export const getOrgCartRest = () => {
  const { sitePath, userPath, orgPrefix } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/${orgPrefix('users')}/${userPath.value}/carts`))
}

export abstract class CartAddressResource extends CartBaseAddressResource {}

const cartAddressResource = (): CartAddressResource => {
  const cartBaseAddressResource = useCartBaseAddressResource()
  const rest = getOrgCartRest()
  const { isB2B } = useRestContext()
  return {
    ...cartBaseAddressResource,
    setDeliveryAddress: (cartId = 'current', addressId: string, queryParams?: RequestData) =>
      (isB2B.value &&
        rest.put<CartData | any>(`${cartId}/addresses/delivery`, rest.toUrlForm({ addressId }), {
          params: queryParams
        })) ||
      cartBaseAddressResource.setDeliveryAddress(cartId, addressId, queryParams)
  }
}

export const useCartAddressResource = () => inject(CartAddressResource, cartAddressResource())

export abstract class CartDeliveryResource extends CartBaseDeliveryResource {}

export const useCartDeliveryResource = () => inject(CartDeliveryResource, useCartBaseDeliveryResource())

export abstract class CartEntryResource extends CartBaseEntryResource {
  addEntries!: (cartId: string, entries: OrderEntryListData, queryParams?: RequestData) => Promise<CartModificationData>
  setEntries!: (cartId: string, entries: OrderEntryListData, queryParams?: RequestData) => Promise<CartModificationData>
}

const cartEntryResource = (): CartEntryResource => {
  const rest = getOrgCartRest()
  const { isB2B } = useRestContext()
  const cartBaseEntryResource = useCartBaseEntryResource()
  const addEntry = (cartId: string = 'current', orderEntry: OrderEntryData, queryParams?: RequestData) =>
    (isB2B.value &&
      rest.postAt<CartModificationData>(
        `${cartId}/entries`,
        rest.toUrlForm({
          code: orderEntry.product?.code,
          qty: orderEntry.quantity
        }),
        {
          params: queryParams
        }
      )) ||
    cartBaseEntryResource.addEntry(cartId, orderEntry, queryParams)
  return {
    ...cartBaseEntryResource,
    addEntry,
    addEntries: async (cartId = 'current', entries: OrderEntryListData, queryParams?: RequestData) =>
      (isB2B.value && (await rest.postAt<CartModificationData>(`${cartId}/entries/`, entries, { params: queryParams }))) ||
      (await Promise.all(entries.orderEntries.map(entry => addEntry(cartId, entry, queryParams)))).reduce((p, n) => ({ ...p, ...n })),
    setEntries: async (cartId = 'current', entries: OrderEntryListData, queryParams?: RequestData) =>
      (isB2B.value &&
        (await rest.put<CartModificationData>(`${cartId}/entries/`, entries, {
          params: queryParams
        }))) ||
      (
        await Promise.all(
          entries.orderEntries.map(entry => cartBaseEntryResource.setEntry(cartId, entry.entryNumber || 0, entry, queryParams))
        )
      ).reduce((p, n) => ({ ...p, ...n }))
  }
}

export const useCartEntryResource = () => inject(CartEntryResource, cartEntryResource())

export abstract class CartEntryGroupResource extends CartBaseEntryGroupResource {}

export const useCartEntryGroupResource = () => inject(CartEntryGroupResource, useCartBaseEntryGroupResource())

export abstract class CartPaymentResource extends CartBasePaymentResource {}

export const useCartPaymentResource = () => inject(CartPaymentResource, useCartBasePaymentResource())

export abstract class CartPromotionResource extends CartBasePromotionResource {}

export const useCartPromotionResource = () => inject(CartPromotionResource, useCartBasePromotionResource())

export abstract class CartCostCenterResource {
  setCostCenter!: (cartId: string, costCenterId: string, queryParams?: RequestData) => Promise<CartData>
}

const cartCostCenterResource = (): CartCostCenterResource => {
  const rest = getCartRest()
  return {
    setCostCenter: (cartId = 'current', costCenterId: string, queryParams?: RequestData) =>
      rest.put<CartData>(`${cartId}/costcenter`, rest.toUrlForm({ costCenterId }), {
        params: queryParams
      })
  }
}

export const useCartCostCenterResource = () => inject(CartCostCenterResource, cartCostCenterResource())

export abstract class CartPaymentTypeResource {
  setPaymentType!: (
    cartId: string,
    paymentType: B2BPaymentType | string,
    purchaseOrderNumber?: string,
    queryParams?: RequestData
  ) => Promise<CartData>
}

const cartPaymentTypeResource = (): CartPaymentTypeResource => {
  const rest = getCartRest()
  return {
    setPaymentType: (cartId = 'current', paymentType: B2BPaymentType | string, purchaseOrderNumber?: string, queryParams?: RequestData) =>
      rest.put<CartData>(
        `${cartId}/paymenttype`,
        rest.toUrlForm({
          purchaseOrderNumber,
          paymentType
        }),
        {
          params: queryParams
        }
      )
  }
}

export const useCartPaymentTypeResource = () => inject(CartPaymentTypeResource, cartPaymentTypeResource())

export interface CartResource
  extends CartBaseResource,
    CartAddressResource,
    CartDeliveryResource,
    CartEntryResource,
    CartEntryGroupResource,
    CartPaymentResource,
    CartPromotionResource,
    CartCostCenterResource,
    CartPaymentTypeResource,
    CartExtendedResource {}

export abstract class CartResource implements CartResource {}

export const useCartResource = () =>
  inject(CartResource, {
    ...useCartBaseResource(),
    ...useCartAddressResource(),
    ...useCartDeliveryResource(),
    ...useCartEntryResource(),
    ...useCartEntryGroupResource(),
    ...useCartPaymentResource(),
    ...useCartPromotionResource(),
    ...useCartCostCenterResource(),
    ...useCartPaymentTypeResource(),
    ...useCartExtendedResource()
  })
