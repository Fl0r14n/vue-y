import type {
  AuthorizationParameters,
  OAuthConfig,
  OAuthParameters,
  OAuthToken,
  OAuthTypeConfig,
  OpenIdConfig,
  OpenIdConfiguration,
  ResourceParameters,
  UserInfo
} from '@/oauth'
import { OAuthStatus, OAuthType } from '@/oauth'
import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const HEADER_APPLICATION = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const HEADER_JSON = {
  'Content-Type': 'application/json'
}

const authConfig: OAuthConfig = {
  storage: localStorage,
  storageKey: 'token',
  ignorePaths: []
}

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

const cleanSearch = () => {
  const { search } = location
  let searchString = (search && search.substring(1)) || ''
  const hashKeys = ['code', 'state', 'error', 'error_description', 'session_state', 'scope', 'authuser', 'prompt']
  hashKeys.forEach(hashKey => {
    const re = new RegExp('&' + hashKey + '(=[^&]*)?|^' + hashKey + '(=[^&]*)?&?')
    searchString = searchString.replace(re, '')
  })
  if (searchString.length) {
    location.search = `?${searchString}`
  }
}

const cleanHash = () => {
  const { hash } = location
  let curHash = (hash && hash.substring(1)) || ''
  const hashKeys = [
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
    'code'
  ]
  hashKeys.forEach(hashKey => {
    const re = new RegExp('&' + hashKey + '(=[^&]*)?|^' + hashKey + '(=[^&]*)?&?')
    curHash = curHash.replace(re, '')
  })
  location.hash = curHash
}

const jwt = (token: string) => JSON.parse(atob(token.split('.')[1]))

const getToken = () => {
  const { storageKey, storage } = authConfig
  return (storageKey && storage && storage[storageKey] && JSON.parse(storage[storageKey])) || {}
}

const setToken = (token: OAuthToken) => {
  const { storageKey, storage } = authConfig
  if (storage && storageKey) {
    if (token) {
      storage[storageKey] = JSON.stringify(token)
    } else {
      delete storage[storageKey]
    }
  }
}

const isExpiredToken = (token?: OAuthToken) => (token && token.expires && Date.now() > token.expires) || false

const refreshToken = async (token?: OAuthToken) => {
  const { tokenPath, clientId, clientSecret, scope } = authConfig.config || ({} as any)
  const { refresh_token } = token || {}
  if (refresh_token) {
    return await axios
      .post<OAuthToken>(
        tokenPath,
        {
          client_id: clientId,
          ...((clientSecret && { client_secret: clientSecret }) || {}),
          grant_type: 'refresh_token',
          refresh_token,
          ...((scope && { scope }) || {})
        },
        {
          headers: HEADER_APPLICATION
        }
      )
      .then(r => r.data as OAuthToken)
      .catch(() => ({} as OAuthToken))
  }
  return token
}

const clientCredentialLogin = () => {
  const { clientId, clientSecret, tokenPath, scope } = authConfig.config || ({} as any)
  return axios
    .post<OAuthToken>(
      tokenPath,
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: OAuthType.CLIENT_CREDENTIAL,
        ...(scope ? { scope } : {})
      },
      {
        headers: HEADER_APPLICATION
      }
    )
    .then(r => r.data)
    .then(t => ({ ...t, type: OAuthType.CLIENT_CREDENTIAL }))
    .catch(err => err)
}

const resourceLogin = (parameters: ResourceParameters) => {
  const { clientId, clientSecret, tokenPath, scope } = authConfig.config as any
  const { username, password } = parameters
  return axios
    .post<OAuthToken>(
      tokenPath,
      {
        client_id: clientId,
        ...((clientSecret && { client_secret: clientSecret }) || {}),
        grant_type: OAuthType.RESOURCE,
        ...((scope && { scope }) || {}),
        username,
        password
      },
      {
        headers: HEADER_APPLICATION
      }
    )
    .then(r => r.data)
    .then(t => ({ ...t, type: OAuthType.RESOURCE }))
    .catch(err => err)
}

const revoke = async (token?: OAuthToken) => {
  const { revokePath, clientId, clientSecret } = authConfig.config as any
  if (revokePath) {
    const { access_token, refresh_token } = token || {}
    if (access_token) {
      await axios
        .post(revokePath, {
          ...((clientId && { client_id: clientId }) || {}),
          ...((clientSecret && { client_secret: clientSecret }) || {}),
          token: access_token,
          token_type_hint: 'access_token'
        })
        .then(r => r.data)
    }
    if (refresh_token) {
      await axios
        .post({
          ...((clientId && { client_id: clientId }) || {}),
          ...((clientSecret && { client_secret: clientSecret }) || {}),
          token: refresh_token,
          token_type_hint: 'refresh_token'
        })
        .then(r => r.data)
    }
  }
}

const authorize = (code: string, codeVerifier?: string) => {
  const { origin, pathname } = location
  const { clientId, clientSecret, tokenPath, scope } = authConfig.config as any
  return axios
    .post<OAuthToken>(tokenPath, {
      code,
      client_id: clientId,
      ...((clientSecret && { client_secret: clientSecret }) || {}),
      redirect_uri: `${origin}${pathname}`,
      grant_type: 'authorization_code',
      ...((scope && { scope }) || {}),
      ...((codeVerifier && { code_verifier: codeVerifier }) || {})
    })
    .then(r => r.data)
}

export const useOAuthStore = defineStore('oauth', () => {
  const http = axios.create({
    headers: HEADER_JSON
  })
  const token = ref<OAuthToken | undefined>(getToken())

  watch(token, t => {
    const expiresIn = Number(t?.expires_in) || 0
    const result = {
      ...t,
      ...((!t?.expires && expiresIn && { expires: Date.now() + expiresIn * 1000 }) || {})
    }
    setToken(result)
  })

  watch(token, t => console.log(t))

  const state = ref<string>()

  const config = computed({
    get() {
      return authConfig.config
    },
    set(config?: OAuthTypeConfig) {
      if (config) {
        authConfig.config = {
          ...authConfig.config,
          ...config
        }
      }
    }
  })

  const ignoredPaths = computed(() => authConfig.ignorePaths)

  const storageKey = computed({
    get() {
      return authConfig.storageKey || 'token'
    },
    set(storageKey: string) {
      authConfig.storageKey = storageKey
      token.value = getToken()
    }
  })

  const type = computed(() => token.value?.type)

  const accessToken = computed(() => token.value?.access_token)

  const status = computed(() => {
    const { value } = token
    return (value?.access_token && OAuthStatus.AUTHORIZED) || (value?.error && OAuthStatus.DENIED) || OAuthStatus.NOT_AUTHORIZED
  })

  const isAuthorized = computed(() => status.value === OAuthStatus.AUTHORIZED)

  const userInfo = computed(async () => {
    const { userPath } = config.value as any
    let userInfo
    if (isAuthorized.value && userPath) {
      userInfo = await http.get<UserInfo>(userPath)
    }
    return userInfo
  })

  watch(
    () => (config.value as OpenIdConfig)?.issuerPath,
    async issuerPath => {
      const v = await axios.get<OpenIdConfiguration>(`${issuerPath}/.well-known/openid-configuration`).then(r => r.data)
      const { config } = authConfig
      authConfig.config = {
        ...config,
        ...((v.authorization_endpoint && { authorizePath: v.authorization_endpoint }) || {}),
        ...((v.token_endpoint && { tokenPath: v.token_endpoint }) || {}),
        ...((v.revocation_endpoint && { revokePath: v.revocation_endpoint }) || {}),
        ...((v.code_challenge_methods_supported && { pkce: v.code_challenge_methods_supported.indexOf('S256') > -1 }) || {}),
        ...((v.userinfo_endpoint && { userPath: v.userinfo_endpoint }) || {}),
        ...((v.introspection_endpoint && { introspectionPath: v.introspection_endpoint }) || {}),
        ...((v.end_session_endpoint && { logoutPath: v.end_session_endpoint }) || {}),
        ...{ scope: config?.scope || 'openid' }
      } as OpenIdConfig
    }
  )

  const login = async (parameters?: OAuthParameters) => {
    if (!!parameters && (parameters as ResourceParameters).password) {
      token.value = await resourceLogin(parameters as ResourceParameters)
    } else if (
      !!parameters &&
      (parameters as AuthorizationParameters).redirectUri &&
      (parameters as AuthorizationParameters).responseType
    ) {
      await toAuthorizationUrl(parameters as AuthorizationParameters)
    } else {
      token.value = await clientCredentialLogin()
    }
  }

  const logout = async (useLogoutUrl?: boolean) => {
    await revoke(token.value)
    token.value = {}
    const { logoutPath, logoutRedirectUri } = config.value as any
    if (useLogoutUrl && logoutPath) {
      const { origin, pathname } = location
      const currentPath = `${origin}${pathname}`
      location.replace(`${logoutPath}?post_logout_redirect_uri=${logoutRedirectUri || currentPath}`)
    }
  }

  const toAuthorizationUrl = async (parameters: AuthorizationParameters) => {
    const { config } = authConfig as any
    let authorizationUrl = `${config.authorizePath}`
    authorizationUrl += (config.authorizePath.includes('?') && '&') || '?'
    authorizationUrl += `client_id=${config.clientId}`
    authorizationUrl += `&redirect_uri=${encodeURIComponent(parameters.redirectUri)}`
    authorizationUrl += `&response_type=${parameters.responseType}`
    authorizationUrl += `&scope=${encodeURIComponent(config.scope || '')}`
    authorizationUrl += `&state=${encodeURIComponent(parameters.state || '')}`
    return location.replace(`${authorizationUrl}${generateNonce(config)}${await generateCodeChallenge(config)}`)
  }

  const generateCodeChallenge = async (config: any) => {
    if (config.pkce) {
      const codeVerifier = randomString()
      token.value = { ...token.value, codeVerifier }
      return `&code_challenge=${await pkce(codeVerifier)}&code_challenge_method=S256`
    }
    return ''
  }

  const generateNonce = (config: any) => {
    if (config && config.scope && config.scope.indexOf('openid') > -1) {
      const nonce = randomString(10)
      token.value = { ...token.value, nonce }
      return `&nonce=${nonce}`
    }
    return ''
  }

  const checkResponse = (token?: OAuthToken, parameters?: Record<string, string>) => {
    state.value = parameters?.state
    cleanHash()
    if (!parameters || parameters['error']) {
      return false
    }
    if (token && token.nonce && parameters['access_token']) {
      const jwtToken = jwt(parameters['access_token'])
      return token.nonce === jwtToken.nonce
    }
    return parameters['access_token'] || parameters['code']
  }

  watch(
    () => config.value?.clientId,
    async () => {
      const { hash, search } = location
      const isImplicitRedirect = hash && /(access_token=)|(error=)/.test(hash)
      const isAuthCodeRedirect = (search && /(code=)|(error=)/.test(search)) || (hash && /(code=)|(error=)/.test(hash))
      if (isImplicitRedirect) {
        const parameters = parseOauthUri(hash.substring(1))
        token.value = {
          ...parameters,
          type: OAuthType.IMPLICIT
        }
        checkResponse(token.value, parameters)
      } else if (isAuthCodeRedirect) {
        const parameters = parseOauthUri((search && search.substring(1)) || (hash && hash.substring(1)))
        if (!checkResponse(token.value, parameters)) {
          token.value = parameters
        } else {
          const { codeVerifier } = token.value || {} //should be set by authorizationUrl construction
          const t = await authorize(parameters?.['code'], codeVerifier)
          token.value = {
            ...t,
            type: OAuthType.AUTHORIZATION_CODE
          }
          cleanSearch()
        }
      }
    }
  )

  const authInterceptor = async (req: AxiosRequestConfig) => {
    if (isExpiredToken(token.value)) {
      token.value = await refreshToken(token.value)
    }
    if (accessToken.value) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${accessToken.value}`
      } as RawAxiosRequestHeaders
    }
    return req
  }

  http.interceptors.request.use(authInterceptor)

  return {
    config,
    storageKey,
    ignoredPaths,
    token,
    type,
    accessToken,
    status,
    isAuthorized,
    userInfo,
    login,
    logout,
    authInterceptor
  }
})
