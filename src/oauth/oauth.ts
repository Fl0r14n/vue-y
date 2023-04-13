import { config, oauthConfig } from '@/oauth/config'
import { authorize, clientCredentialLogin, getOpenIDConfiguration, resourceLogin, revoke } from '@/oauth/http'
import type { AuthorizationParameters, OAuthParameters, OpenIdConfig, ResourceParameters } from '@/oauth/models'
import { OAuthType } from '@/oauth/models'
import { token } from '@/oauth/token'
import { jwt } from '@/oauth/user'
import { ref, watch } from 'vue'

const HASH_KEYS = [
  'access_token',
  'token_type',
  'expires_in',
  'scope',
  'state',
  'error',
  'error_description',
  'session_state',
  'nonce',
  'id_token',
  'code',
  'authuser',
  'prompt',
  'version_info'
]

const arrToString = (buf: Uint8Array) => buf.reduce((s, b) => s + String.fromCharCode(b), '')
const base64url = (str: string) => btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

const randomString = (length: number = 48) => {
  const buff = arrToString(crypto.getRandomValues(new Uint8Array(length * 2)))
  return base64url(buff).substring(0, length)
}

const pkce = async (value: string) => {
  const buff = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return base64url(arrToString(new Uint8Array(buff)))
}

const generateNonce = (scope: string) => {
  if (scope.indexOf('openid') > -1) {
    const nonce = randomString(10)
    token.value = { ...token.value, nonce }
    return `&nonce=${nonce}`
  }
  return ''
}

const checkNonce = (parameters: Record<string, string>) => {
  if (jwt(parameters.id_token)?.nonce !== token.value?.nonce) {
    return {
      error: 'Invalid nonce'
    }
  }
  return parameters
}

const generateCodeChallenge = async (doPkce: any) => {
  if (doPkce) {
    const codeVerifier = randomString()
    token.value = { ...token.value, codeVerifier }
    return `&code_challenge=${await pkce(codeVerifier)}&code_challenge_method=S256`
  }
  return ''
}

const toAuthorizationUrl = async (parameters: AuthorizationParameters) => {
  const { authorizePath, clientId, scope, pkce } = config.value as any
  let authorizationUrl = `${authorizePath}`
  authorizationUrl += (authorizePath.includes('?') && '&') || '?'
  authorizationUrl += `client_id=${clientId}`
  authorizationUrl += `&redirect_uri=${encodeURIComponent(parameters.redirectUri)}`
  authorizationUrl += `&response_type=${parameters.responseType}`
  authorizationUrl += `&scope=${encodeURIComponent(scope || '')}`
  authorizationUrl += `&state=${encodeURIComponent(parameters.state || '')}`
  return location.replace(`${authorizationUrl}${generateNonce(scope)}${await generateCodeChallenge(pkce)}`)
}

const parseOauthUri = (hash: string) => {
  const regex = /([^&=]+)=([^&]*)/g
  const params: Record<string, string> = {}
  let m
  // tslint:disable-next-line:no-conditional-assignment
  while ((m = regex.exec(hash)) !== null) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }
  return (Object.keys(params).length && params) || {}
}

const cleanUrl = async () => {
  const { search, pathname } = location
  let searchString = (search && search.substring(1)) || ''
  HASH_KEYS.forEach(hashKey => {
    const re = new RegExp('&' + hashKey + '(=[^&]*)?|^' + hashKey + '(=[^&]*)?&?')
    searchString = searchString.replace(re, '')
  })
  const { router } = oauthConfig.value
  await router?.push(`${pathname}${searchString}`)
}

export const state = ref<string>()

export const login = async (parameters?: OAuthParameters) => {
  if (!!parameters && (parameters as ResourceParameters).password) {
    token.value = {
      ...(await resourceLogin(parameters as ResourceParameters)),
      type: OAuthType.RESOURCE
    }
  } else if (!!parameters && (parameters as AuthorizationParameters).redirectUri && (parameters as AuthorizationParameters).responseType) {
    await toAuthorizationUrl(parameters as AuthorizationParameters)
  } else {
    token.value = {
      ...(await clientCredentialLogin()),
      type: OAuthType.CLIENT_CREDENTIAL
    }
  }
}

export const logout = async (useLogoutUrl?: boolean) => {
  const { logoutPath, logoutRedirectUri } = config.value as any
  if (useLogoutUrl && logoutPath) {
    token.value = {}
    const { origin, pathname } = location
    const currentPath = `${origin}${pathname}`
    location.replace(`${logoutPath}?post_logout_redirect_uri=${logoutRedirectUri || currentPath}`)
  } else {
    await revoke(token.value)
    token.value = {}
  }
}

watch(
  () => (config.value as OpenIdConfig)?.issuerPath,
  async issuerPath => {
    if (issuerPath) {
      const v = await getOpenIDConfiguration()
      config.value = {
        ...((v.authorization_endpoint && { authorizePath: v.authorization_endpoint }) || {}),
        ...((v.token_endpoint && { tokenPath: v.token_endpoint }) || {}),
        ...((v.revocation_endpoint && { revokePath: v.revocation_endpoint }) || {}),
        ...((v.code_challenge_methods_supported && { pkce: v.code_challenge_methods_supported.indexOf('S256') > -1 }) || {}),
        ...((v.userinfo_endpoint && { userPath: v.userinfo_endpoint }) || {}),
        ...((v.introspection_endpoint && { introspectionPath: v.introspection_endpoint }) || {}),
        ...((v.end_session_endpoint && { logoutPath: v.end_session_endpoint }) || {}),
        ...{ scope: config.value?.scope || 'openid' }
      } as OpenIdConfig
    }
  },
  { immediate: true }
)

watch(
  () => config.value?.clientId,
  async () => {
    const { hash, search } = location
    const isImplicitRedirect = hash && /(access_token=)|(error=)/.test(hash)
    const isAuthCodeRedirect = (search && /(code=)|(error=)/.test(search)) || (hash && /(code=)|(error=)/.test(hash))
    if (isImplicitRedirect) {
      const parameters = parseOauthUri(hash.substring(1))
      token.value = {
        ...checkNonce(parameters),
        type: OAuthType.IMPLICIT
      }
      state.value = parameters?.state
      await cleanUrl()
    } else if (isAuthCodeRedirect) {
      const parameters = parseOauthUri((search && search.substring(1)) || (hash && hash.substring(1)))
      token.value = {
        ...token.value,
        ...parameters,
        type: OAuthType.AUTHORIZATION_CODE
      }
      state.value = parameters?.state
      await cleanUrl()
    }
  },
  { immediate: true }
)

watch([() => (config.value as any)?.tokenPath, () => token.value?.code], async ([tokenPath, code]) => {
  const { codeVerifier } = token.value || {} //should be set by authorizationUrl construction
  if (code && tokenPath) {
    const parameters = await authorize(code, codeVerifier)
    token.value = checkNonce(parameters)
  }
})
