import type { CartData, CartRequestData } from '@/api'
import { FieldLevelMapping, useCartResource } from '@/api'
import { useLocaleStore } from '@/cms'
import { useCartConfig } from '@/config'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

interface CartId {
  guid: string
  guest: boolean
  siteId: string
}

const isAnon = (value: CartId, siteId?: string) =>
  value &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.guid) &&
  !value.guest &&
  value.siteId === siteId

export const useCartStore = defineStore('CartStore', () => {
  const cartResource = useCartResource()
  const cartConfig = useCartConfig()
  const mergeCart = cartConfig.value?.mergeCart || false
  const { locale, storefront } = storeToRefs(useLocaleStore())
  const userStore = useUserStore()
  const { isUserAllowed, isUser } = storeToRefs(userStore)
  const { anonymousLogin } = userStore
  const cart = ref<CartData>()
  const code = computed(() => cartCode(cart.value))
  const isGuest = computed(() => cart.value?.user?.name === 'guest')

  const cartId = computed({
    get: () => {
      try {
        return JSON.parse(sessionStorage.getItem('cartId') || '') as CartId
      } catch (err) {
        return { guid: '', guest: false, siteId: '' } as CartId
      }
    },
    set: (cartId: CartId) => {
      sessionStorage.setItem('cartId', JSON.stringify(cartId))
    }
  })

  watch([cartId, locale], () => {})

  const loadCart = async (cId?: string) => {
    if (isUserAllowed.value) {
      if (isUser.value) {
        try {
          const c = await getCart()
          const cartOptions: CartRequestData = {}
          if (!c?.guid) {
            //could not get cart so get another
            await addCart(cartOptions)
          }
          if (mergeCart && isAnon(cartId.value, storefront.value)) {
            // merge cart if transitioning from anonymous
            cartOptions.oldCartId = cartId.value.guid
            cartOptions.toMergeCartGuid = c?.guid
            await addCart(cartOptions)
          }
          // nothing to do
          // set the cart?
          cartId.value = {
            guid: cartCode(c),
            guest: false,
            siteId: storefront.value || ''
          }
        } catch {
          cart.value = {}
        }
      } else if (cId) {
        try {
          cart.value = await getCart(cId)
        } catch {
          await addCart()
          // might be expired cart
        }
      } else {
        await addCart()
      }
    }
  }

  const setGuestEmail = async (email: string) => {
    await anonymousLogin()
    await cartResource.setEmail(code.value, email)
    cartId.value = {
      guid: code.value,
      guest: true,
      siteId: storefront.value || ''
    }
  }

  const getCart = (cartId?: string) =>
    (cartId &&
      cartResource.getCart(cartId, {
        fields: FieldLevelMapping.FULL
      })) ||
    cartResource
      .getCarts({
        fields: FieldLevelMapping.FULL
      })
      .then(cartList => cartList?.carts?.find(cart => cart.saveTime === undefined))

  const addCart = async (options?: CartRequestData) => {
    cart.value = await cartResource.addCart({
      fields: FieldLevelMapping.FULL,
      ...options
    })
    cartId.value = {
      guid: code.value,
      guest: isGuest.value,
      siteId: storefront.value || ''
    }
  }

  const cartCode = (cart?: CartData) => (isUser.value && cart?.code) || cart?.guid || ''

  return {
    loadCart,
    cart,
    code,
    isGuest,
    setGuestEmail,
    addCart
  }
})
