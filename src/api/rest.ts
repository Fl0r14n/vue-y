import { OAuthType, useOAuthHttp, useOAuthToken } from '@/oauth'
import { SiteChannel, UserType } from '@/api/models'
import { useConfig } from '@/api/module'

export interface RequestOptions {
  params?: object
  headers?: object

  [x: string]: any
}

const capitalize = (s: string) => s.replace(/^\w/, c => c.toUpperCase())

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
