import type { SiteMessageSearchPageData, WithTotalRequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class SiteMessagesResource {
  getSiteMessages?: (queryParams?: WithTotalRequestData) => Promise<SiteMessageSearchPageData>
}

const siteMessagesResource = (): SiteMessagesResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath}/notifications/sitemessages`))
  return {
    getSiteMessages: (queryParams?: WithTotalRequestData) => rest.query<SiteMessageSearchPageData>({ params: queryParams })
  }
}

export const useSiteMessagesResource = () => inject(SiteMessagesResource, siteMessagesResource())
