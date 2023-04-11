import type { RouteLocationNormalized } from 'vue-router'

export const forgotPasswordGuard = (to: RouteLocationNormalized) => {
  const { token } = to.query
  return (token && { name: 'account', params: { id: 'update-password' }, query: { token } }) || false
}
