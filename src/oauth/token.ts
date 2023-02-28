import type { OAuthToken } from '@/oauth/models'
import { OAuthStatus } from '@/oauth/models'
import { oauthConfig } from '@/oauth/config'
import { computed, ref, watch } from 'vue'

const getToken = () => {
  const { storageKey, storage } = oauthConfig.value
  return (storageKey && storage && storage[storageKey] && JSON.parse(storage[storageKey])) || {}
}

const setToken = (token: OAuthToken) => {
  const { storageKey, storage } = oauthConfig.value
  if (storage && storageKey) {
    if (token) {
      storage[storageKey] = JSON.stringify(token)
    } else {
      delete storage[storageKey]
    }
  }
}

const isExpiredToken = (token?: OAuthToken) => (token && token.expires && Date.now() > token.expires) || false

export const token = ref<OAuthToken>(getToken())

watch(token, t => {
  const expiresIn = Number(t?.expires_in) || 0
  const result = {
    ...t,
    ...((!t?.expires && expiresIn && { expires: Date.now() + expiresIn * 1000 }) || {})
  }
  setToken(result)
})

export const storageKey = computed({
  get() {
    return oauthConfig.value.storageKey || 'token'
  },
  set(storageKey: string) {
    oauthConfig.value.storageKey = storageKey
    token.value = getToken()
  }
})

export const type = computed(() => token.value?.type)

export const accessToken = computed(() => {
  const { token_type, access_token } = token.value || {}
  return (token_type && access_token && `${token_type} ${access_token}`) || undefined
})

export const status = computed(() => {
  const { value } = token
  return (
    (value?.error && OAuthStatus.DENIED) ||
    (value?.access_token && !isExpiredToken(token) && OAuthStatus.AUTHORIZED) ||
    OAuthStatus.NOT_AUTHORIZED
  )
})

export const isAuthorized = computed(() => status.value === OAuthStatus.AUTHORIZED)

export const isExpired = computed(() => isExpiredToken(token.value))
