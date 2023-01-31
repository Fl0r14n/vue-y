import { OrderBaseService } from '@/yapi/b2c'
import type {
  B2BOrderData,
  CartModificationListData,
  OrderSubmitData,
  ReplenishmentOrderData,
  RequestData,
  ScheduleReplenishmentFormData
} from '@/yapi/models'

export class OrderService extends OrderBaseService {
  /**
   * Create a cart based on a previous order.
   * Returns a list of modification applied to the new cart compared to original. e.g lower quantity was added
   * @param {string} orderCode
   * @param {RequestData} queryParams
   */
  addCart(orderCode: string, queryParams?: RequestData) {
    return this.postAt<CartModificationListData>(
      `${this.orgPrefix('users')}/${this.userPath}/cartFromOrder`,
      {},
      {
        params: {
          ...queryParams,
          orderCode
        }
      }
    )
  }

  /**
   * Places a B2B Order. By default, the payment type is ACCOUNT.
   * Please set payment type to CARD if placing an order using credit card.
   * @param {OrderSubmitData} orderSubmit
   * @param {RequestData} queryParams
   */
  override placeOrder(orderSubmit: OrderSubmitData, queryParams?: RequestData) {
    return (
      (this.isB2B &&
        this.postAt<B2BOrderData>(
          `${this.orgPrefix('users')}/${this.userPath}/orders`,
          {},
          {
            params: { ...queryParams, ...orderSubmit }
          }
        )) ||
      super.placeOrder(orderSubmit, queryParams)
    )
  }

  /**
   * Creates an Order and schedules Replenishment.
   * Creates an Order and schedules Replenishment.
   * By default, the payment type is ACCOUNT.
   * Please set payment type to CARD if placing an order using credit card.
   * @param {{cartId: string; termsChecked: string}} cart
   * @param {ScheduleReplenishmentFormData} scheduleReplenishmentForm
   * @param {RequestData} queryParams
   */
  placeReplenishmentOrder(
    cart: {
      /**
       * Cart code for logged-in user, cart GUID for guest checkout
       */
      cartId: string
      /**
       * Whether terms were accepted or not.
       */
      termsChecked: boolean
    },
    scheduleReplenishmentForm: ScheduleReplenishmentFormData,
    queryParams?: RequestData
  ) {
    return this.postAt<ReplenishmentOrderData>(
      `${this.orgPrefix('users')}/${this.userPath}/replenishmentOrders`,
      scheduleReplenishmentForm,
      {
        params: { ...cart, ...queryParams }
      }
    )
  }
}
