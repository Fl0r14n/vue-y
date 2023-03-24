import { AuthRestClient } from '@/api/rest'

export class LoginNotificationResource extends AuthRestClient {
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
