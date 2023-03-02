import { config, ignoredPaths, oauthConfig } from '@/oauth/config'
import type { OAuthConfig } from '@/oauth/models'
import { login, logout } from '@/oauth/oauth'
import OAuthLogin from '@/oauth/OAuth.vue'
import { accessToken, isAuthorized, isExpired, status, storageKey, token, type } from '@/oauth/token'
import { authorizationInterceptor, http, unauthorizedInterceptor, user } from '@/oauth/user'
import type { App } from 'vue'
import { markRaw } from 'vue'
import type { Router } from 'vue-router'

export interface OAuthModule {
  install: (app: App) => void
  useRouter: (router: Router) => OAuthModule
}

export const createOAuth = (cfg: OAuthConfig) => {
  const module = {} as OAuthModule
  module.install = (app: App) => {
    oauthConfig.value = {
      ...oauthConfig.value,
      ...cfg
    }
    app.provide('http', http)
    app.provide('login', login)
    app.provide('logout', logout)
    app.component('v-oauth', OAuthLogin)
  }
  module.useRouter = (router: Router) => {
    oauthConfig.value.router = markRaw(router)
    return module
  }
  return module
}

export const useOAuthConfig = () => oauthConfig
export const useOAuthToken = () => token
export const useOAuthUser = () => user
export const useOAuthHttp = () => http
export const useOAuthInterceptors = () => ({
  authorizationInterceptor,
  unauthorizedInterceptor
})
export const useOAuth = () => ({
  config,
  storageKey,
  ignoredPaths,
  type,
  accessToken,
  status,
  isAuthorized,
  isExpired,
  login,
  logout
})
