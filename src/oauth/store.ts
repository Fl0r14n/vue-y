import type {
  AuthorizationParameters,
  OAuthParameters,
  OAuthToken,
  OAuthTypeConfig,
  OpenIdConfig,
  OpenIdConfiguration,
  ResourceParameters,
  UserInfo
} from '@/oauth'
import { oauthConfig, OAuthStatus, OAuthType } from '@/oauth'
import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const HEADER_APPLICATION = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const HEADER_JSON = {
  'Content-Type': 'application/json'
}

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

const jwt = (token?: string) =>
  token
    ? JSON.parse(
        decodeURIComponent(
          Array.from(atob(token.split('.')[1]))
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      )
    : {}

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

const config = computed({
  get() {
    return oauthConfig.value.config as OAuthTypeConfig
  },
  set(config?: OAuthTypeConfig) {
    if (config) {
      oauthConfig.value.config = {
        ...oauthConfig.value.config,
        ...config
      }
    }
  }
})

const refreshToken = async (token?: OAuthToken) => {
  const { tokenPath, clientId, clientSecret, scope } = (config.value as any) || ({} as any)
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
      .catch(err => err.response)
      .then(r => r.data)
  }
  return token
}

const clientCredentialLogin = () => {
  const { clientId, clientSecret, tokenPath, scope } = (config.value as any) || ({} as any)
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
    .catch(err => err.response)
    .then(r => r.data)
    .then(t => ({ ...t, type: OAuthType.CLIENT_CREDENTIAL }))
}

const resourceLogin = (parameters: ResourceParameters) => {
  const { clientId, clientSecret, tokenPath, scope } = config.value as any
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
    .catch(err => err.response)
    .then(r => r.data)
    .then(t => ({ ...t, type: OAuthType.RESOURCE }))
}

const revoke = async (token?: OAuthToken) => {
  const { revokePath, clientId, clientSecret } = config.value as any
  if (revokePath) {
    const { access_token, refresh_token } = token || {}
    if (access_token) {
      await axios
        .post(
          revokePath,
          {
            ...((clientId && { client_id: clientId }) || {}),
            ...((clientSecret && { client_secret: clientSecret }) || {}),
            token: access_token,
            token_type_hint: 'access_token'
          },
          {
            headers: HEADER_APPLICATION
          }
        )
        .then(r => r.data)
    }
    if (refresh_token) {
      await axios
        .post(
          revokePath,
          {
            ...((clientId && { client_id: clientId }) || {}),
            ...((clientSecret && { client_secret: clientSecret }) || {}),
            token: refresh_token,
            token_type_hint: 'refresh_token'
          },
          {
            headers: HEADER_APPLICATION
          }
        )
        .catch(err => err.response)
        .then(r => r.data)
    }
  }
}

const authorize = (code: string, codeVerifier?: string) => {
  const { origin, pathname } = location
  const { clientId, clientSecret, tokenPath, scope } = config.value as any
  return axios
    .post<OAuthToken>(
      tokenPath,
      {
        code,
        client_id: clientId,
        ...((clientSecret && { client_secret: clientSecret }) || {}),
        redirect_uri: `${origin}${pathname}`,
        grant_type: 'authorization_code',
        ...((scope && { scope }) || {}),
        ...((codeVerifier && { code_verifier: codeVerifier }) || {})
      },
      {
        headers: HEADER_APPLICATION
      }
    )
    .catch(err => err.response)
    .then(r => r.data)
    .then(t => ({ ...t, type: OAuthType.AUTHORIZATION_CODE }))
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

  const state = ref<string>()

  const ignoredPaths = computed(() => oauthConfig.value.ignorePaths)

  const storageKey = computed({
    get() {
      return oauthConfig.value.storageKey || 'token'
    },
    set(storageKey: string) {
      oauthConfig.value.storageKey = storageKey
      token.value = getToken()
    }
  })

  const type = computed(() => token.value?.type)

  const accessToken = computed(() => {
    const { token_type, access_token } = token.value || {}
    return (token_type && access_token && `${token_type} ${access_token}`) || undefined
  })

  const status = computed(() => {
    const { value } = token
    return (value?.error && OAuthStatus.DENIED) || (value?.access_token && OAuthStatus.AUTHORIZED) || OAuthStatus.NOT_AUTHORIZED
  })

  const isAuthorized = computed(() => status.value === OAuthStatus.AUTHORIZED)

  const user = ref<UserInfo>({})

  watch(
    () => token.value?.id_token,
    idToken => {
      if (idToken) {
        user.value = jwt(idToken)
      }
    },
    { immediate: true }
  )

  watch([isAuthorized, () => (config.value as any)?.userPath], async ([authorized, userPath]) => {
    if (authorized && userPath) {
      user.value = await http
        .get<UserInfo>(userPath)
        .catch(err => err.response)
        .then(r => r.data)
    }
  })

  watch([() => (config.value as any)?.tokenPath, () => token.value?.code], async ([tokenPath, code]) => {
    const { codeVerifier } = token.value || {} //should be set by authorizationUrl construction
    if (code && tokenPath) {
      const parameters = await authorize(code, codeVerifier)
      token.value = checkNonce(parameters)
    }
  })

  watch(
    () => (config.value as OpenIdConfig)?.issuerPath,
    async issuerPath => {
      const v = await axios.get<OpenIdConfiguration>(`${issuerPath}/.well-known/openid-configuration`).then(r => r.data)
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
    },
    { immediate: true }
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

  const generateCodeChallenge = async (doPkce: any) => {
    if (doPkce) {
      const codeVerifier = randomString()
      token.value = { ...token.value, codeVerifier }
      return `&code_challenge=${await pkce(codeVerifier)}&code_challenge_method=S256`
    }
    return ''
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

  const cleanUrl = async () => {
    const { search, pathname } = location
    let searchString = (search && search.substring(1)) || ''
    HASH_KEYS.forEach(hashKey => {
      const re = new RegExp('&' + hashKey + '(=[^&]*)?|^' + hashKey + '(=[^&]*)?&?')
      searchString = searchString.replace(re, '')
    })
    // TODO
    // await router.push(`${pathname}${search}`)
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

  const authInterceptor = async (req: AxiosRequestConfig) => {
    if (isExpiredToken(token.value)) {
      token.value = await refreshToken(token.value)
    }
    if (accessToken.value) {
      req.headers = {
        ...req.headers,
        Authorization: accessToken.value
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
    user,
    login,
    logout,
    authInterceptor
  }
})
