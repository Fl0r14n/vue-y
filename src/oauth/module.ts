import { config, ignoredPaths, oauthConfig } from '@/oauth/config'
import type { OAuthConfig } from '@/oauth/models'
import { login, logout } from '@/oauth/oauth'
import OAuthLogin from '@/oauth/OAuth.vue'
import { accessToken, isAuthorized, isExpired, status, storageKey, token, type } from '@/oauth/token'
import { authorizationInterceptor, http, unauthorizedInterceptor, user } from '@/oauth/user'
import type { App } from 'vue'

export const createOAuth = (cfg: OAuthConfig) => ({
  install: (app: App) => {
    oauthConfig.value = {
      ...oauthConfig.value,
      ...cfg
    }
    app.provide('http', http)
    app.provide('login', login)
    app.provide('logout', logout)
    app.component('v-oauth', OAuthLogin)
  }
})

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
