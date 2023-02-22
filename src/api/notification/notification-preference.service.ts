import type { BasicNotificationPreferenceListData, NotificationPreferenceListData, RequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class NotificationPreferenceService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}`
  }

  /**
   * Returns the notification preferences of the current customer.
   * @param {RequestData} queryParams
   */
  getNotificationPreferences(queryParams?: RequestData) {
    return this.get<NotificationPreferenceListData>('notificationpreferences', { params: queryParams })
  }

  /**
   * Updates the notification preference of the current customer.
   * @param {BasicNotificationPreferenceListData} preferences
   * @param {RequestData} queryParams
   */
  setNotificationPreferences(preferences: BasicNotificationPreferenceListData, queryParams?: RequestData) {
    return this.patch<void>('notificationpreferences', preferences, { params: queryParams })
  }
}
