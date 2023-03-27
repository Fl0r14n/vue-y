import type { ResetPasswordData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'

export abstract class ForgottenPasswordResource {
  initializeResetPassword!: (userId: string) => Promise<void>
  resetPassword!: (resetPassword: ResetPasswordData) => Promise<void>
}

const forgottenPasswordResource = (): ForgottenPasswordResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(sitePath)
  return {
    initializeResetPassword: (userId: string) => rest.postAt<void>(`forgottenpasswordtokens`, {}, { params: { userId } }),
    resetPassword: (resetPassword: ResetPasswordData) =>
      rest.postAt<void>(`resetpassword`, resetPassword, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }
}

export const useForgottenPasswordResource = () => inject(ForgottenPasswordResource, forgottenPasswordResource())
