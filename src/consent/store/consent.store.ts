import type { ConsentTemplateData } from '@/api'
import { useConsentResource } from '@/api'
import { useSiteConfig } from '@/config'
import { useOAuthHttp } from '@/oauth'
import { useUserStore } from '@/user'
import type { InternalAxiosRequestConfig } from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export enum CONSENT_STATUS {
  GIVEN = 'GIVEN',
  WITHDRAWN = 'WITHDRAWN'
}

export interface CookieConsent {
  consents: {
    templateCode: string
    templateVersion?: number
    consentState?: CONSENT_STATUS
  }[]
  bannerDismissed: boolean
}

const COOKIE_CONSENT = 'cookieConsent'

export const useConsentStore = defineStore('ConsentStore', () => {
  const consentResource = useConsentResource()
  const { isUser } = storeToRefs(useUserStore())
  const http = useOAuthHttp()
  const site = useSiteConfig()
  const consentKey = computed(() => `${site.value?.uid}.${COOKIE_CONSENT}`)
  const consentCookie = computed({
    get: () => JSON.parse(localStorage.getItem(consentKey.value) as string) as CookieConsent,
    set: consentCookie => localStorage.setItem(consentKey.value, JSON.stringify(consentCookie))
  })
  const bannerDismissed = computed({
    get: () => consentCookie.value?.bannerDismissed || false,
    set: isDismissed => consentCookie.value && (consentCookie.value.bannerDismissed = isDismissed)
  })
  const consentTemplates = ref<ConsentTemplateData[]>()
  const consents = computed(() => {
    const templates = consentTemplates.value?.filter(t => t.exposed) || []
    return (
      (consentCookie.value?.consents &&
        templates.filter(
          t => t.exposed && !consentCookie.value?.consents.find(c => c.templateCode === t.id && c.templateVersion === t.version)
        )) ||
      templates
    )
  })

  watch(isUser, async () => await loadConsentTemplates())

  http.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const { consents } = consentCookie.value || {}
    consents?.length && req.headers.set('x-anonymous-consents', encodeURIComponent(JSON.stringify(consents)))
    return req
  })

  const loadConsentTemplates = async () => (consentTemplates.value = await consentResource.getConsents().then(v => v.consentTemplates))

  const changeConsent = async (consent: ConsentTemplateData, accepted = false) => {
    const { code } = consent.currentConsent || {}
    if (accepted) {
      await consentResource.addConsent({
        consentTemplateId: consent.id,
        consentTemplateVersion: consent.version
      })
    } else {
      code && (await consentResource.delConsent(code))
    }
    await loadConsentTemplates()
  }

  return {
    consentCookie,
    consents,
    bannerDismissed,
    changeConsent
  }
})
