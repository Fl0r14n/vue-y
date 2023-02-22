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
  PromotionResultListData,
  RequestData,
  SortableRequestData,
  VoucherListData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export abstract class CartEndpoint extends AuthRestClient {
  getEndpoint(options?: RequestData) {
    return `${this.basePath}/${(options?.['isOrg'] && this.orgPrefix('users')) || 'users'}/${this.userPath}/carts`
  }
}

export class CartBaseAddressService extends CartEndpoint {
  /**
   * Creates an address and assigns it to the cart as the delivery address.
   * @param {string} cartId
   * @param {AddressData} address
   * @param {RequestData} queryParams
   */
  addDeliveryAddress(cartId = 'current', address: AddressData, queryParams?: RequestData) {
    return this.postAt<AddressData>(`${cartId}/addresses/delivery`, address, { params: queryParams })
  }

  /**
   * Sets a delivery address for the cart.
   * The address country must be placed among the delivery countries of the current base store.
   * @param {string} cartId
   * @param {string} addressId
   * @param {RequestData} queryParams
   */
  setDeliveryAddress(cartId = 'current', addressId: string, queryParams?: RequestData) {
    return this.put<void>(`${cartId}/addresses/delivery`, {}, { params: { ...queryParams, addressId } })
  }

  /**
   * Removes the delivery address from the cart.
   * @param {string} cartId
   */
  delDeliveryAddress(cartId = 'current') {
    return this.delete<void>(`${cartId}/addresses/delivery`)
  }
}

export class CartBaseDeliveryService extends CartEndpoint {
  /**
   * Returns all delivery modes supported for the current base store and cart delivery address.<br/>
   * A delivery address must be set for the cart, otherwise an empty list will be returned.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getDeliveryModes(cartId = 'current', queryParams?: RequestData) {
    return this.get<DeliveryModeListData>(`${cartId}/deliverymodes`, { params: queryParams })
  }

  /**
   * Returns the delivery mode selected for the cart.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getDeliveryMode(cartId = 'current', queryParams?: RequestData) {
    return this.get<DeliveryModeData>(`${cartId}/deliverymode`, { params: queryParams })
  }

  /**
   * Sets the delivery mode with a given identifier for the cart.
   * @param {string} cartId
   * @param {string} deliveryModeId
   * @param {RequestData} queryParams
   */
  setDeliveryMode(cartId = 'current', deliveryModeId: string, queryParams?: RequestData) {
    return this.put<void>(`${cartId}/deliverymode`, {}, { params: { ...queryParams, deliveryModeId } })
  }

  /**
   * Removes the delivery mode from the cart.
   * @param {string} cartId
   */
  delDeliveryMode(cartId = 'current') {
    return this.delete<void>(`${cartId}/deliverymode`)
  }
}

export class CartBaseEntryService extends CartEndpoint {
  /**
   * Returns cart entries.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getEntries(cartId = 'current', queryParams?: RequestData) {
    return this.get<OrderEntryListData>(`${cartId}/entries`, { params: queryParams })
  }

  /**
   * Adds a product to the cart.
   * @param {string} cartId
   * @param {OrderEntryData} orderEntry
   * @param {RequestData} queryParams
   */
  addEntry(cartId = 'current', orderEntry: OrderEntryData, queryParams?: RequestData) {
    return this.postAt<CartModificationData>(`${cartId}/entries`, orderEntry, { params: queryParams })
  }

  /**
   * Returns the details of the cart entries.
   * @param {string} cartId
   * @param {number} entryNumber
   * @param {RequestData} queryParams
   */
  getEntry(cartId = 'current', entryNumber: number, queryParams?: RequestData) {
    return this.get<OrderEntryData>(`${cartId}/entries/${entryNumber}`, { params: queryParams })
  }

  /**
   * Updates the quantity of a single cart entry and details of the store where the cart entry will be picked.
   * @param {string} cartId
   * @param {number} entryNumber
   * @param {OrderEntryData} orderEntry
   * @param {RequestData} queryParams
   */
  setEntry(cartId = 'current', entryNumber: number, orderEntry: OrderEntryData, queryParams?: RequestData) {
    return this.patch<CartModificationData>(`${cartId}/entries/${entryNumber}`, orderEntry, { params: queryParams })
  }

  /**
   * Deletes cart entry.
   * @param {string} cartId
   * @param {number} entryNumber
   */
  delEntry(cartId = 'current', entryNumber: number) {
    return this.delete<void>(`${cartId}/entries/${entryNumber}`)
  }
}

export class CartBaseEntryGroupService extends CartEndpoint {
  /**
   * Adds a product to a cart entry group.
   * @param {string} cartId
   * @param {number} entryGroupNumber
   * @param {OrderEntryData} orderEntry
   * @param {RequestData} queryParams
   */
  addEntryGroup(cartId = 'current', entryGroupNumber: number, orderEntry: OrderEntryData, queryParams?: RequestData) {
    return this.postAt<CartModificationData>(`${cartId}/entrygroups/${entryGroupNumber}`, orderEntry, { params: queryParams })
  }

  /**
   * Removes an entry group from an associated cart.<br/>
   * The entry group is identified by an entryGroupNumber.<br/>
   * The cart is identified by the cartId.<br/>
   * @param {string} cartId
   * @param {number} entryGroupNumber
   */
  delEntryGroup(cartId = 'current', entryGroupNumber: number) {
    return this.delete<void>(`${cartId}/entrygroups/${entryGroupNumber}`)
  }
}

export class CartBasePaymentService extends CartEndpoint {
  /**
   * Defines details of a new credit card payment details and assigns the payment to the cart.
   * @param {string} cartId
   * @param {PaymentDetailsData} paymentDetails
   * @param {RequestData} queryParams
   */
  addPaymentDetails(cartId = 'current', paymentDetails: PaymentDetailsData, queryParams?: RequestData) {
    return this.postAt<PaymentDetailsData>(`${cartId}/paymentdetails`, paymentDetails, { params: queryParams })
  }

  /**
   * Sets credit card payment details for the cart.
   * @param {string} cartId
   * @param {string} paymentDetailsId
   * @param {RequestData} queryParams
   */
  setPaymentDetails(cartId = 'current', paymentDetailsId: string, queryParams?: RequestData) {
    return this.put<void>(`${cartId}/paymentdetails`, {}, { params: { ...queryParams, paymentDetailsId } })
  }
}

export class CartBasePromotionService extends CartEndpoint {
  /**
   * Return information about promotions applied on cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getPromotions(cartId = 'current', queryParams?: RequestData) {
    return this.get<PromotionResultListData>(`${cartId}/promotions`, { params: queryParams })
  }

  /**
   * Enables the promotion for the order based on the promotionId defined for the cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} cartId
   * @param {string} promotionId
   * @param {RequestData} queryParams
   */
  addPromotion(cartId = 'current', promotionId: string, queryParams?: RequestData) {
    return this.postAt<void>(`${cartId}/promotions`, {}, { params: { ...queryParams, promotionId } })
  }

  /**
   * Return information about promotion with given id, applied on cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} cartId
   * @param {string} promotionId
   * @param {RequestData} queryParams
   */
  getPromotion(cartId = 'current', promotionId: string, queryParams?: RequestData) {
    return this.get<PromotionResultListData>(`${cartId}/promotions/${promotionId}`, { params: queryParams })
  }

  /**
   * Disables the promotion for the order based on the promotionId defined for the cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} cartId
   * @param {string} promotionId
   */
  delPromotion(cartId = 'current', promotionId: string) {
    return this.delete<void>(`${cartId}/promotions/${promotionId}`)
  }

  /**
   * Returns list of vouchers applied to the cart.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getVouchers(cartId = 'current', queryParams?: RequestData) {
    return this.get<VoucherListData>(`${cartId}/vouchers`, { params: queryParams })
  }

  /**
   * Applies a voucher based on the voucherId defined for the cart.
   * @param {string} cartId
   * @param {string} voucherId
   * @param {RequestData} queryParams
   */
  addVoucher(cartId = 'current', voucherId: string, queryParams?: RequestData) {
    return this.postAt<void>(`${cartId}/vouchers`, {}, { params: { ...queryParams, voucherId } })
  }

  /**
   * Removes a voucher based on the voucherId defined for the current cart.
   * @param {string} cartId
   * @param {string} voucherId
   */
  delVoucher(cartId = 'current', voucherId: string) {
    return this.delete<void>(`${cartId}/vouchers/${voucherId}`)
  }
}

export class CartBaseService extends CartEndpoint {
  /**
   * Lists all customer carts.
   * @param {{savedCartsOnly?: string} & SortableRequestData} queryParams
   */
  getCarts(
    queryParams?: {
      /**
       * optional parameter. If the parameter is provided and its value is true only saved carts are returned.
       */
      savedCartsOnly?: boolean
    } & SortableRequestData
  ) {
    return this.query<CartListData>({ params: queryParams })
  }

  /**
   * Creates or restore a cart for a user.
   * Creates a new cart or restores an anonymous cart as a user’s cart (if an old cart id is given in the request).
   * @param queryParams
   */
  addCart(queryParams?: CartRequestData) {
    return this.post<CartData>({}, { params: queryParams })
  }

  /**
   * Returns the cart with a given identifier.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getCart(cartId = 'current', queryParams?: RequestData) {
    return this.get<CartData>(cartId, { params: queryParams })
  }

  /**
   * Deletes a cart with a given cart id.
   * @param {string} cartId
   */
  delCart(cartId = 'current') {
    return this.delete<void>(cartId)
  }

  /**
   * Assigns an email to the cart. This step is required to make a guest checkout.
   * @param {string} cartId
   * @param {string} email
   * @param {RequestData} queryParams
   */
  setEmail(cartId = 'current', email: string, queryParams?: RequestData) {
    return this.put<void>(`${cartId}/email`, {}, { params: { ...queryParams, email } })
  }
}
