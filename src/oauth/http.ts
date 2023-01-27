import type { OAuthToken, OpenIdConfiguration, ResourceParameters } from '@/oauth/models'
import { OAuthType } from '@/oauth/models'
import { config } from '@/oauth/config'
import axios from 'axios'

const HEADER_APPLICATION = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export const refresh = async (token?: OAuthToken) => {
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

export const clientCredentialLogin = () => {
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

export const resourceLogin = (parameters: ResourceParameters) => {
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

export const revoke = async (token?: OAuthToken) => {
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

export const authorize = (code: string, codeVerifier?: string) => {
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

export const getOpenIDConfiguration = () => {
  const { issuerPath } = config.value as any
  return axios
    .get<OpenIdConfiguration>(`${issuerPath}/.well-known/openid-configuration`)
    .catch(err => err.response)
    .then(r => r.data)
}
