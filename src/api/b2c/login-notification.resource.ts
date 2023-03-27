import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class LoginNotificationResource {
  addLoginNotification!: () => Promise<void>
}

const loginNotificationResource = (): LoginNotificationResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/loginnotification`))
  return {
    addLoginNotification: () => rest.post<void>({})
  }
}

export const useLoginNotificationResource = () => inject(LoginNotificationResource, loginNotificationResource())
