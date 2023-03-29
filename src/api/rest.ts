import { SiteChannel, UserType } from '@/api/models'
import { useApiConfig, useLocaleConfig, useSiteConfig } from '@/config'
import { OAuthType, useOAuthHttp, useOAuthToken } from '@/oauth'
import type { InternalAxiosRequestConfig } from 'axios'
import { computed, type Ref } from 'vue'

export interface RequestOptions {
  params?: Record<string, any>
  headers?: Record<string, any>

  [x: string]: any
}

const capitalize = (s: string) => s.replace(/^\w/, c => c.toUpperCase())
const http = useOAuthHttp()
const site = useSiteConfig()
const api = useApiConfig()
const token = useOAuthToken()
const host = computed(() => api.value?.host)
const basePath = computed(() => `${api.value?.host}${api.value?.path}`)
const siteId = computed(() => site.value?.uid)
const sitePath = computed(() => `${basePath.value}/${siteId.value}`)
const isB2B = computed(() => site.value?.channel === SiteChannel.B2B)
const orgPrefix = (endpoint: string) => (api.value?.overlappingPaths && `org${capitalize(endpoint)}`) || endpoint
const fixOptions = (options?: RequestOptions) => {
  if (options?.params) {
    const encoded = new URLSearchParams()
    const { params } = options
    for (const key of Object.keys(params)) {
      if (Array.isArray(params[key])) {
        for (const val of params[key]) {
          if (typeof val !== 'undefined') {
            encoded.append(key, val)
          }
        }
      }
      if (typeof params[key] !== 'undefined') {
        encoded.append(key, params[key])
      }
    }
    options.params = encoded
  }
  return options
}
const isLoggedIn = computed(() => {
  const { type, access_token } = token.value
  return (access_token && type === OAuthType.RESOURCE) || type === OAuthType.IMPLICIT || type === OAuthType.AUTHORIZATION_CODE
})
const customerId = computed(() => token.value.asagent && (token.value.customerId || UserType.ANONYMOUS))
const userPath = computed(() => (isLoggedIn.value && (customerId.value || UserType.USER)) || UserType.ANONYMOUS)
http.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const { language, currency } = useLocaleConfig().value || {}
  if (language && currency) {
    req.params.append('lang', language)
    req.params.append('curr', currency)
  }
  return req
})
const toUrlForm = (body: Record<string, any>) => {
  const params = new URLSearchParams()
  Object.keys(body).forEach(k => params.append(k, body[k]))
  return params
}

export const useRestContext = () => ({
  host,
  basePath,
  siteId,
  sitePath,
  isB2B,
  orgPrefix,
  isLoggedIn,
  customerId,
  userPath
})

export const useRestClient = (endpoint: Ref<string>) => {
  // const endpoint = ref<string>('')
  const query = <T>(options?: RequestOptions) => {
    return http
      .get<T>(endpoint.value, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const get = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .get<T>(`${endpoint.value}/${id}`, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const head = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .head<T>(`${endpoint.value}/${id}`, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const postAt = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .post<T>(`${endpoint.value}/${id}`, body, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const post = <T>(body: any, options?: RequestOptions) => {
    return http
      .post<T>(endpoint.value, body, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const put = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .put<T>(`${endpoint.value}/${id}`, body, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const patch = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .patch<T>(`${endpoint.value}/${id}`, body, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  const del = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .delete<T>(`${endpoint.value}/${id}`, fixOptions(options))
      .catch(err => err.response)
      .then(r => r.data)
  }
  return {
    query,
    head,
    get,
    post,
    postAt,
    put,
    patch,
    del,
    toUrlForm
  }
}
