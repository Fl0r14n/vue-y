import { useForgottenPasswordResource } from '@/api'
import { useUserStore } from '@/user'
import { defineStore } from 'pinia'

export const usePasswordResetStore = defineStore('PasswordResetStore', () => {
  const { anonymousLogin } = useUserStore()
  const forgottenPasswordResource = useForgottenPasswordResource()
  const requestPasswordReset = async (userId: string) => {
    await anonymousLogin()
    await forgottenPasswordResource.initializeResetPassword(userId)
  }
  const resetPassword = async (token: string, newPassword: string) => {
    await anonymousLogin()
    await forgottenPasswordResource.resetPassword({ token, newPassword })
  }
  return {
    requestPasswordReset,
    resetPassword
  }
})
