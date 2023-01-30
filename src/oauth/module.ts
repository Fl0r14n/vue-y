import { config, ignoredPaths, oauthConfig } from '@/oauth/config'
import type { OAuthConfig, OAuthParameters, OAuthStatus, OAuthToken, OAuthType, OAuthTypeConfig, UserInfo } from '@/oauth/models'
import { login, logout } from '@/oauth/oauth'
import OAuthLogin from '@/oauth/OAuth.vue'
import { accessToken, isAuthorized, isExpired, status, storageKey, token, type } from '@/oauth/token'
import { authorizationInterceptor, http, unauthorizedInterceptor, user } from '@/oauth/user'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { App, ComputedRef, InjectionKey, Ref, WritableComputedRef } from 'vue'
import { inject } from 'vue'

export const OAUTH_CONFIG = Symbol('OAuthConfig') as InjectionKey<Ref<OAuthConfig>>
export const OAUTH_TOKEN = Symbol('OAuthToken') as InjectionKey<Ref<OAuthToken>>
export const OAUTH_USER = Symbol('OAuthUser') as InjectionKey<Ref<UserInfo>>
export const OAUTH_HTTP = Symbol('OAuthHttp') as InjectionKey<AxiosInstance>
export const OAUTH_INTERCEPTORS = Symbol('OAuthInterceptors') as InjectionKey<{
  authorizationInterceptor: (req: AxiosRequestConfig<any>) => Promise<AxiosRequestConfig<any>>
  unauthorizedInterceptor: (error: any) => any
}>
export const OAUTH = Symbol('OAuth') as InjectionKey<{
  config: WritableComputedRef<OAuthTypeConfig>
  storageKey: WritableComputedRef<string>
  ignoredPaths: ComputedRef<RegExp[] | undefined>
  type: ComputedRef<OAuthType | undefined>
  accessToken: ComputedRef<string | undefined>
  status: ComputedRef<OAuthStatus>
  isAuthorized: ComputedRef<boolean>
  isExpired: ComputedRef<boolean>
  login: (parameters?: OAuthParameters | undefined) => Promise<void>
  logout: (useLogoutUrl?: boolean | undefined) => Promise<void>
}>
export const createOAuth = (cfg: OAuthConfig) => {
  const install = (app: App) => {
    oauthConfig.value = {
      ...oauthConfig.value,
      ...cfg
    }
    app.provide(OAUTH_CONFIG, oauthConfig)
    app.provide(OAUTH_TOKEN, token)
    app.provide(OAUTH_USER, user)
    app.provide(OAUTH_HTTP, http)
    app.provide(OAUTH_INTERCEPTORS, {
      authorizationInterceptor,
      unauthorizedInterceptor
    })
    app.provide(OAUTH, {
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
    app.provide('http', http)
    app.provide('login', login)
    app.provide('logout', logout)
    app.component('v-oauth', OAuthLogin)
  }
  return { install }
}

export const useOAuthConfig = () => inject(OAUTH_CONFIG)!
export const useOAuthToken = () => inject(OAUTH_TOKEN)!
export const useOAuthUser = () => inject(OAUTH_USER)!
export const useOAuthHttp = () => inject(OAUTH_HTTP)!
export const useOAuthInterceptors = () => inject(OAUTH_INTERCEPTORS)!
export const useOAuth = () => inject(OAUTH)!
