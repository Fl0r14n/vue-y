import { useApiConfig, useConfig, useSiteConfig } from '@/config'
import { SiteChannel, UserType } from '@/api/models'
import { OAuthType, useOAuthHttp, useOAuthToken } from '@/oauth'
import { computed, ref } from 'vue'

export interface RequestOptions {
  params?: object
  headers?: object

  [x: string]: any
}

const capitalize = (s: string) => s.replace(/^\w/, c => c.toUpperCase())

export const useRestClient = () => {
  const http = useOAuthHttp()
  const site = useSiteConfig()
  const api = useApiConfig()
  const host = computed(() => api.value?.host)
  const basePath = computed(() => `${api.value?.host}${api.value?.path}`)
  const siteId = computed(() => site.value?.uid)
  const sitePath = computed(() => `${basePath.value}/${siteId.value}`)
  const endpoint = ref<string>('')
  const isB2B = computed(() => site.value?.channel === SiteChannel.B2B)
  const orgPrefix = (endpoint: string) => (api.value?.overlappingPaths && `org${capitalize(endpoint)}`) || endpoint
  const query = <T>(options?: RequestOptions) => {
    return http
      .get<T>(endpoint.value, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const get = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .get<T>(`${endpoint.value}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const head = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .head<T>(`${endpoint.value}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const postAt = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .post<T>(`${endpoint.value}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const post = <T>(body: any, options?: RequestOptions) => {
    return http
      .post<T>(endpoint.value, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const put = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .put<T>(`${endpoint.value}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const patch = <T>(id: number | string, body: any, options?: RequestOptions) => {
    return http
      .patch<T>(`${endpoint.value}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  const del = <T>(id: number | string, options?: RequestOptions) => {
    return http
      .delete<T>(`${endpoint.value}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
  return {
    endpoint,
    host,
    basePath,
    siteId,
    sitePath,
    isB2B,
    orgPrefix,
    query,
    head,
    get,
    post,
    postAt,
    put,
    patch,
    del
  }
}

export const useAuthRestClient = () => {
  const rest = useRestClient()
  const token = useOAuthToken()
  const isLoggedIn = computed(() => {
    const { type, access_token } = token.value
    return (access_token && type === OAuthType.RESOURCE) || type === OAuthType.IMPLICIT || type === OAuthType.AUTHORIZATION_CODE
  })
  const customerId = computed(() => token.value.asagent && (token.value.customerId || UserType.ANONYMOUS))
  const userPath = computed(() => (isLoggedIn.value && (customerId.value || UserType.USER)) || UserType.ANONYMOUS)
  return {
    ...rest,
    isLoggedIn,
    customerId,
    userPath
  }
}

export abstract class RestClient {
  protected http = useOAuthHttp()
  protected config = useConfig()

  abstract getEndpoint(options?: RequestOptions): string

  get basePath() {
    const { api } = this.config.value
    return `${api?.host}${api?.path}/${this.siteId}`
  }

  get isB2B() {
    const { site } = this.config.value
    return site?.channel === SiteChannel.B2B
  }

  get siteId() {
    const { site } = this.config.value
    return site?.uid
  }

  /**
   * If ConfigService overlappingPaths is enabled. Should match occ.rewrite.overlapping.paths.enabled in hybris
   * @returns org prefix
   */
  orgPrefix(endpoint: string) {
    const { api } = this.config.value
    return (api?.overlappingPaths && `org${capitalize(endpoint)}`) || endpoint
  }

  query<T>(options?: RequestOptions) {
    return this.http
      .get<T>(this.getEndpoint(options), options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  get<T>(id: number | string, options?: RequestOptions) {
    return this.http
      .get<T>(`${this.getEndpoint(options)}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  head<T>(id: number | string, options?: RequestOptions) {
    return this.http
      .head<T>(`${this.getEndpoint(options)}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  postAt<T>(id: number | string, body: any, options?: RequestOptions) {
    return this.http
      .post<T>(`${this.getEndpoint(options)}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  post<T>(body: any, options?: RequestOptions) {
    return this.http
      .post<T>(this.getEndpoint(options), body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  put<T>(id: number | string, body: any, options?: RequestOptions) {
    return this.http
      .put<T>(`${this.getEndpoint(options)}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  patch<T>(id: number | string, body: any, options?: RequestOptions) {
    return this.http
      .patch<T>(`${this.getEndpoint(options)}/${id}`, body, options)
      .catch(err => err.response)
      .then(r => r.data)
  }

  delete<T>(id: number | string, options?: RequestOptions) {
    return this.http
      .delete<T>(`${this.getEndpoint(options)}/${id}`, options)
      .catch(err => err.response)
      .then(r => r.data)
  }
}

export abstract class AuthRestClient extends RestClient {
  protected token = useOAuthToken()

  get userPath() {
    return (this.isLoggedIn && (this.customerId || UserType.USER)) || UserType.ANONYMOUS
  }

  get isLoggedIn() {
    const { type, access_token } = this.token.value
    return (access_token && type === OAuthType.RESOURCE) || type === OAuthType.IMPLICIT || type === OAuthType.AUTHORIZATION_CODE
  }

  get customerId() {
    const { value } = this.token
    return value.asagent && (value.customerId || UserType.ANONYMOUS)
  }
}
