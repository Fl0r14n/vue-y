import {
  CartBaseAddressService,
  CartBaseDeliveryService,
  CartBaseEntryGroupService,
  CartBaseEntryService,
  CartBasePaymentService,
  CartBasePromotionService,
  CartBaseService,
  CartEndpoint
} from '@/yapi/b2c'
import type { B2BPaymentType, CartData, CartModificationData, OrderEntryData, OrderEntryListData, RequestData } from '@/yapi/models'
import type { CartExtendedService } from '../ext'

export class CartAddressService extends CartBaseAddressService {
  /**
   * Sets a delivery address for the cart.
   * The address country must be placed among the delivery countries of the current base store.
   * @param {string} cartId
   * @param {string} addressId
   * @param {RequestData} queryParams
   */
  override setDeliveryAddress(cartId = 'current', addressId: string, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.put<CartData | any>(`${cartId}/addresses/delivery`, this.toHttpParams({ addressId }), {
          params: queryParams,
          isOrg: true
        })) ||
      super.setDeliveryAddress(cartId, addressId, queryParams)
    )
  }
}

export class CartDeliveryService extends CartBaseDeliveryService {}

export class CartEntryService extends CartBaseEntryService {
  /**
   * Updates the details of specified products in the cart, based either on the product code or the entryNumber.
   * @param {string} cartId
   * @param {OrderEntryListData} entries
   * @param {RequestData} queryParams
   */
  addEntries(cartId = 'current', entries: OrderEntryListData, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.postAt<CartModificationData>(`${cartId}/entries/`, entries, {
          params: queryParams,
          isOrg: true
        })) ||
      forkJoin(entries.orderEntries.map(entry => this.addEntry(cartId, entry, queryParams))).pipe(
        map(v => v.reduce((p, n) => ({ ...p, ...n })))
      )
    )
  }

  /**
   * Creates the specified products in the cart, or overwrites the details of existing products in the cart,
   * based either on the product code or the entryNumber.
   * For existing products, attributes not provided in the request body will be defined again (set to null or default).
   * @param {string} cartId
   * @param {OrderEntryListData} entries
   * @param {RequestData} queryParams
   */
  setEntries(cartId = 'current', entries: OrderEntryListData, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.put<CartModificationData>(`${cartId}/entries/`, entries, {
          params: queryParams,
          isOrg: true
        })) ||
      forkJoin(entries.orderEntries.map(entry => this.setEntry(cartId, entry.entryNumber || 0, entry, queryParams))).pipe(
        map(v => v.reduce((p, n) => ({ ...p, ...n })))
      )
    )
  }

  /**
   * Override default addCartEntry
   * @param {string} cartId
   * @param {OrderEntryData} orderEntry
   * @param {RequestData} queryParams
   */
  override addEntry(cartId: string = 'current', orderEntry: OrderEntryData, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.postAt<CartModificationData>(
          `${cartId}/entries`,
          this.toHttpParams({
            code: orderEntry.product?.code,
            qty: orderEntry.quantity
          }),
          {
            params: queryParams,
            isOrg: true
          }
        )) ||
      super.addEntry(cartId, orderEntry, queryParams)
    )
  }
}

export class CartEntryGroupService extends CartBaseEntryGroupService {}

export class CartPaymentService extends CartBasePaymentService {}

export class CartPromotionService extends CartBasePromotionService {}

export class CartCostCenterService extends CartEndpoint {
  /**
   * Sets the cost center for the checkout cart.
   * @param {string} cartId
   * @param {string} costCenterId
   * @param {RequestData} queryParams
   */
  setCostCenter(cartId = 'current', costCenterId: string, queryParams?: RequestData) {
    return this.put<CartData>(`${cartId}/costcenter`, this.toHttpParams({ costCenterId }), {
      params: queryParams
    })
  }
}

export class CartPaymentType extends CartEndpoint {
  /**
   * Sets the payment type for the checkout cart.
   * If the purchaseOrderNumber is not null, the purchaseOrderNumber is also assigned to the cart.
   * @param {string} cartId
   * @param {string} purchaseOrderNumber
   * @param {B2BPaymentType | string} paymentType
   * @param {RequestData} queryParams
   */
  setPaymentType(cartId = 'current', paymentType: B2BPaymentType | string, purchaseOrderNumber?: string, queryParams?: RequestData) {
    return this.put<CartData>(
      `${cartId}/paymenttype`,
      this.toHttpParams({
        purchaseOrderNumber,
        paymentType
      }),
      {
        params: queryParams
      }
    )
  }
}

export interface CartService
  extends CartBaseService,
    CartAddressService,
    CartDeliveryService,
    CartEntryService,
    CartEntryGroupService,
    CartPaymentService,
    CartPromotionService,
    CartCostCenterService,
    CartPaymentType,
    CartExtendedService {}

export abstract class CartService implements CartService {}
