import { useUserStore } from '@/user'
import { storeToRefs } from 'pinia'

export const logoutGuard = async () => {
  const userStore = useUserStore()
  const { isAgent } = storeToRefs(userStore)
  const { logout } = userStore
  if (!isAgent.value) {
    await logout()
    return { name: 'home' }
  }
  return false
}
