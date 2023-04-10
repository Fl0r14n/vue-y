import type { ConsentTemplateData, ConsentTemplateListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class ConsentResource {
  addConsent!: (consentOptions?: { consentTemplateId: string; consentTemplateVersion?: number }) => Promise<ConsentTemplateData>
  delConsent!: (consentCode: string) => Promise<void>
  getConsents!: (queryParams?: RequestData) => Promise<ConsentTemplateListData>
  getConsent!: (consentTemplateId?: string, queryParams?: RequestData) => Promise<ConsentTemplateData>
}

const consentResource = (): ConsentResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}`))
  return {
    addConsent: (consentOptions?: { consentTemplateId: string; consentTemplateVersion?: number }) =>
      rest.postAt<ConsentTemplateData>('consents', {}, { params: consentOptions }),
    delConsent: (consentCode: string) => rest.del<void>(`consents/${consentCode}`),
    getConsents: (queryParams?: RequestData) => rest.get<ConsentTemplateListData>('consenttemplates', { params: queryParams }),
    getConsent: (consentTemplateId?: string, queryParams?: RequestData) =>
      rest.get<ConsentTemplateData>(`consenttemplates/${consentTemplateId}`, { params: queryParams })
  }
}

export const useConsentResource = () => inject(ConsentResource, consentResource())
