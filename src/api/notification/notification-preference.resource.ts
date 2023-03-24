import type { BasicNotificationPreferenceListData, NotificationPreferenceListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class NotificationPreferenceResource {
  getNotificationPreferences?: (queryParams?: RequestData) => Promise<NotificationPreferenceListData>
  setNotificationPreferences?: (preferences: BasicNotificationPreferenceListData, queryParams?: RequestData) => Promise<void>
}

const notificationPreferenceResource = (): NotificationPreferenceResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath}`))
  return {
    getNotificationPreferences: (queryParams?: RequestData) =>
      rest.get<NotificationPreferenceListData>('notificationpreferences', { params: queryParams }),
    setNotificationPreferences: (preferences: BasicNotificationPreferenceListData, queryParams?: RequestData) =>
      rest.patch<void>('notificationpreferences', preferences, { params: queryParams })
  }
}

export const useNotificationPreferenceResource = () => inject(NotificationPreferenceResource, notificationPreferenceResource())
