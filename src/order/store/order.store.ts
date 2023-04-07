import type { CancellationRequestEntryInputListData, OrderHistoryListData } from '@/api'
import { FieldLevelMapping, type OrderData, useOrderResource, usePageable } from '@/api'
import { useCartStore } from '@/cart'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useOrderStore = defineStore('OrderStore', () => {
  const orderResource = useOrderResource()
  const cartStore = useCartStore()
  const { cart } = storeToRefs(cartStore)
  const { addCart } = cartStore
  const { request, sort, pageSize, currentPage } = usePageable()
  const ordersPage = ref<OrderHistoryListData>()
  const orders = computed(() => ordersPage.value?.orders)
  const pagination = computed(() => ordersPage.value?.pagination)
  const sorts = computed(() => ordersPage.value?.sorts)
  const order = ref<OrderData>()
  const code = computed({
    get: () => order.value?.code,
    set: async code =>
      code &&
      (order.value = await orderResource.getOrder(code, {
        fields: FieldLevelMapping.FULL
      }))
  })

  watch(request, async req => (ordersPage.value = await orderResource.getOrders({ fields: FieldLevelMapping.FULL, ...req })), {
    deep: true
  })

  const place = async () => {
    const { value } = cart
    if (value && value.guid) {
      order.value = await orderResource.placeOrder({
        cartId: value.guid,
        securityCode: value.paymentInfo?.issueNumber,
        termsChecked: true
      })
    }
    await addCart()
  }

  const cancel = async (orderCode: string, entries: CancellationRequestEntryInputListData) => {
    await orderResource.cancelOrder(orderCode, entries)
  }
  return {
    ordersPage,
    orders,
    pagination,
    sorts,
    sort,
    pageSize,
    currentPage,
    order,
    code,
    place,
    cancel
  }
})
