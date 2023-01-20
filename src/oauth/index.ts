import OAuthLogin from '@/oauth/OAuthLogin.vue'
import { useOAuthStore } from '@/oauth/store'
import type { App } from 'vue'

export interface ClientCredentialConfig {
  tokenPath: string
  revokePath?: string
  clientId: string
  clientSecret?: string
  scope?: string
}

export interface ResourceConfig extends ClientCredentialConfig {}

export interface ImplicitConfig {
  authorizePath: string
  revokePath?: string
  clientId: string
  scope?: string
  logoutPath?: string
  logoutRedirectUri?: string
}

export interface AuthorizationCodeConfig extends ResourceConfig {
  authorizePath: string
}

export interface AuthorizationCodePKCEConfig extends AuthorizationCodeConfig {
  pkce: boolean
}

export interface OpenIdConfig {
  issuerPath: string
  clientId: string
  clientSecret?: string
  scope?: string
}

export interface ResourceParameters {
  username: string
  password: string
}

export interface AuthorizationParameters {
  redirectUri: string
  responseType: OAuthType.IMPLICIT | OAuthType.AUTHORIZATION_CODE | string
  state?: string
}

export type OAuthParameters = ResourceParameters | AuthorizationParameters
export type OAuthTypeConfig =
  | OpenIdConfig
  | AuthorizationCodePKCEConfig
  | AuthorizationCodeConfig
  | ImplicitConfig
  | ResourceConfig
  | ClientCredentialConfig

export interface OAuthConfig {
  config?: OAuthTypeConfig
  storageKey?: string
  storage?: Storage
  ignorePaths?: RegExp[]

  [x: string]: any
}

export enum OAuthType {
  RESOURCE = 'password',
  AUTHORIZATION_CODE = 'code',
  IMPLICIT = 'token',
  CLIENT_CREDENTIAL = 'client_credentials'
}

export interface OAuthToken {
  id_token?: string
  access_token?: string
  refresh_token?: string
  token_type?: string
  state?: string
  error?: string
  error_description?: string
  expires_in?: number | string
  refresh_expires_in?: number | string
  scope?: string
  codeVerifier?: string
  nonce?: string
  type?: OAuthType
  expires?: number

  code?: string

  [x: string]: any
}

export enum OAuthStatus {
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  AUTHORIZED = 'AUTHORIZED',
  DENIED = 'DENIED'
}

export interface OpenIdConfiguration {
  issuer?: string
  authorization_endpoint?: string
  introspection_endpoint?: string
  token_endpoint?: string
  userinfo_endpoint?: string
  end_session_endpoint?: string
  revocation_endpoint?: string
  scopes_supported?: string[]
  code_challenge_methods_supported?: string[]
}

export interface UserInfo {
  email?: string
  email_verified?: boolean
  family_name?: string
  given_name?: string
  name?: string
  preferred_username?: string
  sub?: string
  address?: object
  picture?: string
  locale?: string
}

export interface IntrospectInfo extends UserInfo {
  active: boolean
  scope: string
  client_id?: string
  username: string
  exp: number
}

export const oauthConfig: OAuthConfig = {
  storage: localStorage,
  storageKey: 'token',
  ignorePaths: []
}

export const createOAuth = (config: OAuthConfig) => {
  const install = (app: App, ...options: any[]) => {
    Object.assign(oauthConfig, config)
    const oauth = useOAuthStore()
    const { login, logout } = oauth
    app.provide('login', login)
    app.provide('logout', logout)
    app.component('v-oauth', OAuthLogin)
  }
  return { install }
}
