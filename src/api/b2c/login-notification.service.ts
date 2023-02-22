import { AuthRestClient } from '@/api/rest'

export class LoginNotificationService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/loginnotification`
  }

  /**
   * Publish notification event about successful login.
   */
  addLoginNotification() {
    return this.post<void>({})
  }
}
