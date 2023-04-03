import type { CartData } from '@/api'
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

export const useCartStore = defineStore('CartStore', () => {
  const cartConfig = useCartConfig()
  const mergeCart = cartConfig.value?.mergeCart || false
  const { locale } = storeToRefs(useLocaleStore())
  const { isUserAllowed, isUser } = storeToRefs(useUserStore())
  const cart = ref<CartData>()
  const code = computed(() => (isUser.value && cart.value?.code) || cart.value?.guid || '')
  const isGuest = computed(() => cart.value?.user?.name === 'guest')
  const entries = computed(() => cart.value?.entries)
  const deliveryEntries = computed(() => entries.value?.filter(entry => !entry.deliveryPointOfService))
  const deliveryAddress = computed(() => cart.value?.deliveryAddress)
  const deliveryMode = computed(() => cart.value?.deliveryMode)

  const cartId = computed({
    get: () => {
      try {
        return JSON.parse(sessionStorage.getItem('cartId') || '')
      } catch (err) {
        return { guid: '', guest: false, siteId: '' }
      }
    },
    set: (cartId: CartId) => {
      sessionStorage.setItem('cartId', JSON.stringify(cartId))
    }
  })

  watch([cartId, locale], () => {
    if (isUserAllowed.value) {
      if (isUser.value) {
        //TODO
      }
    }
  })

  return {
    cart,
    code,
    isGuest,
    entries,
    deliveryEntries,
    deliveryAddress,
    deliveryMode
  }
})
