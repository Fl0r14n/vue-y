import type { UserData, UserSignUpData } from '@/api'
import { SiteChannel, UserType, useUserResource } from '@/api'
import { useSiteConfig } from '@/config'
import { OAuthType, useOAuth, useOAuthToken } from '@/oauth'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

declare module '@/api' {
  export interface UserData {
    type?: UserType
  }
}

export const useUserStore = defineStore('UserStore', () => {
  const userResource = useUserResource()
  const router = useRouter()
  const site = useSiteConfig()
  const token = useOAuthToken()
  const oauth = useOAuth()
  const type = oauth.type
  const isAuthorized = oauth.isAuthorized
  const user = ref<UserData>()
  const isUser = computed(() => user.value?.type === UserType.USER)
  const isB2BUser = computed(() => (isUser.value && user.value?.roles?.includes('b2bcustomergroup')) || false)
  const isUserAllowed = computed(() => {
    const { channel, requiresAuthentication } = site.value || {}
    if (isUser.value) {
      return (channel === SiteChannel.B2B && isB2BUser.value) || true
    }
    return !requiresAuthentication
  })
  const isAgent = computed(() => Boolean(token.value.access_token && token.value['asagent']))
  const isImpersonated = computed(() => Boolean(isAgent.value && token.value['customerId']))
  const isLogin = computed(
    () => isImpersonated.value || Boolean(!isAgent.value && token.value.access_token && token.value.type !== OAuthType.CLIENT_CREDENTIAL)
  )

  const loadUser = async () => {
    user.value = await userResource.getUser()
  }

  const logout = async (useLogoutUrl?: boolean) => !isAgent.value && (await oauth.logout(useLogoutUrl))

  watch(
    token,
    async () => {
      if (isLogin.value) {
        await loadUser()
      } else {
        user.value = {
          customerId: UserType.ANONYMOUS
        }
      }
    },
    { immediate: true }
  )

  watch(user, u => {
    if (u?.customerId) {
      user.value = {
        ...u,
        type: (u.customerId === UserType.ANONYMOUS && UserType.ANONYMOUS) || UserType.USER
      }
    }
  })

  watch([isUser, isUserAllowed], ([isUser, isUserAllowed]) => isUser && !isUserAllowed && logout())

  const anonymousLogin = async () => {
    if (type.value !== OAuthType.CLIENT_CREDENTIAL) {
      await oauth.logout()
    }
    await oauth.login()
  }

  const login = async (username?: string, password?: string) => {
    if (!isAgent.value) {
      if (isAuthorized.value) {
        await logout()
      }
      const responseType = (username && password && OAuthType.RESOURCE) || OAuthType.AUTHORIZATION_CODE
      await oauth.login({ responseType, username, password } as any)
    }
  }

  const addUser = async (user: UserSignUpData) => {
    if (isAuthorized.value) {
      const created = await userResource.addUser(user)
      await login(created.uid, created.password)
      await router.push({ name: 'home' })
    }
  }

  const setUser = async (user: UserData) => {
    if (isAuthorized.value) {
      await userResource.setUser(user)
      await loadUser()
    }
  }

  const delUser = async () => {
    if (isAuthorized.value) {
      await userResource.delUser()
      await oauth.logout()
      await router.push({ name: 'login' })
    }
  }

  const setLogin = async (newLogin: string, password: string) => {
    if (isAuthorized.value) {
      await userResource.setLogin({ password, newLogin })
      await oauth.logout()
      await router.push({ name: 'login' })
    }
  }

  const setPassword = async (oldPassword: string, newPassword: string) => {
    if (isAuthorized.value) {
      await userResource.setPassword({
        old: oldPassword,
        new: newPassword
      })
    }
  }

  return {
    user,
    logout,
    anonymousLogin,
    login,
    addUser,
    setUser,
    delUser,
    setLogin,
    setPassword,
    isUser,
    isB2BUser,
    isAgent,
    isImpersonated,
    isLogin,
    isUserAllowed,
    token
  }
})
