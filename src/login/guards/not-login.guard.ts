import { useUserStore } from '@/user'
import { storeToRefs } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export const notLoginGuard = (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)
  const { returnUrl } = to.query
  return (!isLogin.value && true) || (returnUrl && { path: returnUrl }) || { name: 'home' }
}
