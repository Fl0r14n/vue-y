import { type NotificationPreferenceData, useNotificationPreferenceResource } from '@/api'
import { useUserStore } from '@/user'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

export const useNotificationStore = defineStore('NotificationStore', () => {
  const notificationPreferenceResource = useNotificationPreferenceResource()
  const { user, isUser } = storeToRefs(useUserStore())
  const notificationPreferences = ref<NotificationPreferenceData[]>()
  const loadNotificationPreferences = async () =>
    (notificationPreferences.value = await notificationPreferenceResource.getNotificationPreferences().then(v => v.preferences))

  watch(user, async () => isUser.value && (await loadNotificationPreferences()))

  const setNotificationPreference = async (preference: NotificationPreferenceData) => {
    await notificationPreferenceResource.setNotificationPreferences({ preferences: [preference] })
    await loadNotificationPreferences()
  }

  return {
    notificationPreferences,
    setNotificationPreference
  }
})
