import { config, ignoredPaths } from '@/oauth/config'
import { refresh } from '@/oauth/http'
import type { UserInfo } from '@/oauth/models'
import { accessToken, isAuthorized, isExpired, token } from '@/oauth/token'
import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ref, watch } from 'vue'

const HEADER_JSON = {
  'Content-Type': 'application/json'
}

const isPathIgnored = (req: InternalAxiosRequestConfig) => {
  if (ignoredPaths.value) {
    for (const ignoredPath of ignoredPaths.value) {
      try {
        if (req.url?.match(ignoredPath)) {
          return true
        }
      } catch {
        /* empty */
      }
    }
  }
  return false
}

export const http = axios.create({
  headers: HEADER_JSON
})

const getUser = () => {
  const { userPath } = config.value as any
  return http
    .get<UserInfo>(userPath)
    .catch(err => err.response)
    .then(r => r.data)
}

export const jwt = (token?: string) =>
  token
    ? JSON.parse(
        decodeURIComponent(
          Array.from(atob(token.split('.')[1]))
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      )
    : {}

export const user = ref<UserInfo>({})

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
    user.value = await getUser()
  }
})

export const authorizationInterceptor = async (req: InternalAxiosRequestConfig) => {
  if (!isPathIgnored(req)) {
    if (isExpired.value) {
      token.value = await refresh(token.value)
    }
    if (accessToken.value) {
      req.headers.setAuthorization(accessToken.value)
    }
  }
  return req
}

export const unauthorizedInterceptor = (error: any) => {
  if (401 === error.response?.status) {
    token.value = error.response.data
  }
  return error
}

http.interceptors.request.use(authorizationInterceptor)
http.interceptors.response.use(res => res, unauthorizedInterceptor)
