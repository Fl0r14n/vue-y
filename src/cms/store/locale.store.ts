import type { CurrencyData, LanguageData } from '@/api'
import { UrlEncodingAttributes } from '@/api'
import { useRouter, useSiteStore } from '@/cms'
import { useLocaleConfig, useLocaleContextMapper } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const setDocumentLang = (lang: string) => (document.documentElement.lang = lang)

export const useLocaleStore = defineStore('LocaleStore', () => {
  const i18n = useI18n()
  const locale = useLocaleConfig()
  const router = useRouter()
  const contextMapper = useLocaleContextMapper()
  const { site, sites } = storeToRefs(useSiteStore())
  const languages = ref<LanguageData[]>()
  const currencies = ref<CurrencyData[]>()
  const storefront = computed({
    get: () => site.value?.uid,
    set: storefront => {
      if (storefront) {
        const newSite = sites.value.find(s => s.uid === storefront)
        if (newSite) {
          site.value = newSite
        }
      }
    }
  })
  const storefronts = computed(() => sites.value.map(s => ({ code: s.uid, name: s.name })))
  const language = computed({
    get: () => locale.value?.language,
    set: language =>
      language &&
      locale.value &&
      (locale.value = {
        ...locale.value,
        language
      })
  })
  const currency = computed({
    get: () => locale.value?.currency,
    set: currency =>
      currency &&
      locale.value &&
      (locale.value = {
        ...locale.value,
        currency
      })
  })
  const browserLanguage = navigator.language.split('-')[0]
  const basePath = computed(() => {
    let path = ''
    const { urlEncodingAttributes } = site.value || {}
    if (urlEncodingAttributes) {
      for (const attr of urlEncodingAttributes) {
        switch (attr) {
          case UrlEncodingAttributes.STOREFRONT: {
            path += `/${contextMapper.toStorefrontUrlSegment(locale.value)}`
            break
          }
          case UrlEncodingAttributes.LANGUAGE: {
            path += `/${contextMapper.toLanguageUrlSegment(locale.value)}`
            break
          }
          case UrlEncodingAttributes.CURRENCY: {
            path += `/${contextMapper.toCurrencyUrlSegment(locale.value)}`
          }
        }
      }
    }
    return path
  })

  const updateUrl = async (url: Location) => {
    const { pathname, search, hash } = url
    const { urlEncodingAttributes } = site.value || {}
    if (urlEncodingAttributes) {
      const segments = pathname.split('/')
      urlEncodingAttributes.forEach((attr, i) => {
        switch (attr) {
          case UrlEncodingAttributes.STOREFRONT: {
            segments[i + 1] = contextMapper.toStorefrontUrlSegment(locale.value)
            break
          }
          case UrlEncodingAttributes.LANGUAGE: {
            segments[i + 1] = contextMapper.toLanguageUrlSegment(locale.value)
            break
          }
          case UrlEncodingAttributes.CURRENCY: {
            segments[i + 1] = contextMapper.toCurrencyUrlSegment(locale.value)
            break
          }
        }
      })
      const path = segments.join('/')
      if (location.pathname !== path) {
        await router.replace(`${path}${search}${hash}`)
      }
    }
  }

  watch(
    () => language.value,
    language => language && (setDocumentLang(language) || (i18n.locale.value = language)),
    { immediate: true }
  )

  watch(
    () => locale.value,
    async l => {
      if (l?.language || l?.currency) {
        await updateUrl(location)
      }
    }
  )

  watch(
    () => site.value,
    async site => {
      if (site?.uid) {
        let language = site.defaultLanguage?.isocode || locale.value?.language || 'en'
        let currency = locale.value?.currency || 'USD'
        // update fallback language
        i18n.fallbackLocale.value = language
        // set locales from store
        const { stores, urlEncodingAttributes } = site
        if (stores?.length) {
          const store = stores[0]
          currencies.value = store.currencies?.filter(c => c.active)
          languages.value = store.languages?.filter(l => l.active)
          const defaultCurrency = store.defaultCurrency?.isocode
          if (defaultCurrency) {
            currency = defaultCurrency
          }
          const defaultLanguage = browserLanguage
          if (defaultLanguage && languages.value?.map(l => l.isocode).includes(defaultLanguage)) {
            language = defaultLanguage
          }
          const segments = location.pathname.split('/')
          urlEncodingAttributes?.forEach((attr, i) => {
            switch (attr) {
              case UrlEncodingAttributes.LANGUAGE: {
                const val = contextMapper.fromLanguageUrlSegment(locale.value, segments[i + 1])
                if (!!val && languages.value?.map(l => l.isocode).includes(val)) {
                  language = val
                }
                break
              }
              case UrlEncodingAttributes.CURRENCY: {
                const val = contextMapper.fromCurrencyUrlSegment(locale.value, segments[i + 1])
                if (!!val && currencies.value?.map(c => c.isocode).includes(val)) {
                  currency = val
                }
                break
              }
            }
          })
        }
        // set locale
        locale.value = {
          ...locale.value,
          storefront: site.uid,
          categoryCode: site.defaultPreviewCategoryCode,
          catalogId: site.defaultPreviewCatalogId,
          productCode: site.defaultPreviewProductCode,
          language,
          currency
        }
      }
    },
    { immediate: true }
  )

  return {
    storefronts,
    languages,
    currencies,
    storefront,
    language,
    currency,
    browserLanguage,
    basePath,
    locale
  }
})
