import type { ResetPasswordData } from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class ForgottenPasswordService extends RestClient {
  getEndpoint() {
    return `${this.basePath}`
  }

  /**
   * Generates a token to restore customer's forgotten password.
   * @param {string} userId Customer's user id. Customer user id is case-insensitive.
   */
  initializeResetPassword(userId: string) {
    return this.postAt<void>(`forgottenpasswordtokens`, {}, { params: { userId } })
  }

  /**
   * Reset password after customer’s clicked forgotten password link.
   * @param {ResetPasswordData} resetPassword
   */
  resetPassword(resetPassword: ResetPasswordData) {
    return this.postAt<void>(`resetpassword`, resetPassword, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
