import { useRestClient, useRestContext } from '@/api'
import { OrderBaseResource, useOrderBaseResource } from '@/api/b2c'
import type {
  B2BOrderData,
  CartModificationListData,
  OrderSubmitData,
  ReplenishmentOrderData,
  RequestData,
  ScheduleReplenishmentFormData
} from '@/api/models'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class OrderResource extends OrderBaseResource {
  addCart!: (orderCode: string, queryParams?: RequestData) => Promise<CartModificationListData>
  placeReplenishmentOrder!: (
    cart: {
      cartId: string
      termsChecked: boolean
    },
    scheduleReplenishmentForm: ScheduleReplenishmentFormData,
    queryParams?: RequestData
  ) => Promise<ReplenishmentOrderData>
}

const orderResource = (): OrderResource => {
  const orderBaseResource = useOrderBaseResource()
  const { sitePath, userPath, orgPrefix, isB2B } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/${orgPrefix('users')}/${userPath.value}`))
  return {
    ...orderBaseResource,
    addCart: (orderCode: string, queryParams?: RequestData) =>
      rest.postAt<CartModificationListData>(
        `cartFromOrder`,
        {},
        {
          params: {
            ...queryParams,
            orderCode
          }
        }
      ),
    placeReplenishmentOrder: (
      cart: {
        cartId: string
        termsChecked: boolean
      },
      scheduleReplenishmentForm: ScheduleReplenishmentFormData,
      queryParams?: RequestData
    ) =>
      rest.postAt<ReplenishmentOrderData>(`replenishmentOrders`, scheduleReplenishmentForm, {
        params: { ...cart, ...queryParams }
      }),
    placeOrder: (orderSubmit: OrderSubmitData, queryParams?: RequestData) =>
      (isB2B.value &&
        rest.postAt<B2BOrderData>(
          `orders`,
          {},
          {
            params: { ...queryParams, ...orderSubmit }
          }
        )) ||
      orderBaseResource.placeOrder(orderSubmit, queryParams)
  }
}

export const useOrderResource = () => inject(OrderResource, orderResource())
