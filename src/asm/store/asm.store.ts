import { useAsmResource } from '@/api'
import { OAuthType, useOAuth, useOAuthToken } from '@/oauth'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const ASM = 'asm'

export const useAsmStore = defineStore('AsmStore', () => {
  const asmResource = useAsmResource()
  const oAuth = useOAuth()
  const token = useOAuthToken()
  const isAgent = computed(() => Boolean(token.value?.access_token && token.value['asagent']))
  const isImpersonated = computed(() => Boolean(isAgent.value && token.value['customerId']))
  const isAsm = computed({
    get: () => JSON.parse(localStorage.getItem(ASM) || 'false'),
    set: isAsm => localStorage.setItem(ASM, JSON.stringify(isAsm))
  })
  const route = useRoute()
  if (route.query.asm) {
    isAsm.value = route.query.asm === 'true'
  }

  const login = async (username?: string, password?: string) => {
    oAuth.isAuthorized.value && (await oAuth.logout())
    const responseType = (username && password && OAuthType.RESOURCE) || OAuthType.AUTHORIZATION_CODE
    await oAuth.login({ responseType, username, password } as any).then(
      () =>
        (token.value = {
          ...token.value,
          asagent: true
        })
    )
  }

  const logout = (useLogoutUrl?: boolean) => oAuth.logout(useLogoutUrl)

  const impersonate = (customerId: string) =>
    (token.value = {
      ...token.value,
      customerId
    })

  const renounce = () =>
    (token.value = {
      ...token.value,
      customerId: undefined
    })

  const search = (query: string) => asmResource.searchCustomers({ query })

  return {
    isAsm,
    isAgent,
    isImpersonated,
    search,
    login,
    logout,
    impersonate,
    renounce
  }
})
