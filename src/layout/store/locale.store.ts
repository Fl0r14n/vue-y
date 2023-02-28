import type { CurrencyData, LanguageData } from '@/api'
import { UrlEncodingAttributes, useLocaleConfig, useLocaleContextMapper } from '@/api'
import { useSiteStore } from '@/layout/store/site.store'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const setDocumentLang = (lang: string) => (document.documentElement.lang = lang)

export const useLocaleStore = () => {
  const i18n = useI18n()
  const locale = useLocaleConfig()
  const contextMapper = useLocaleContextMapper()
  const { site } = useSiteStore()
  const languages = ref<LanguageData[]>()
  const currencies = ref<CurrencyData[]>()
  const language = computed({
    get: () => locale.value?.language,
    set: language => language && locale.value && (locale.value.language = language)
  })
  const currency = computed({
    get: () => locale.value?.currency,
    set: currency => currency && locale.value && (locale.value.currency = currency)
  })
  const browserLanguage = navigator.language.split('-')[0]

  watch(
    () => language.value,
    language => language && (setDocumentLang(language) || (i18n.locale.value = language)),
    { immediate: true }
  )

  watch(
    () => site.value,
    site => {
      if (site) {
        // set locale
        locale.value = {
          ...locale.value,
          storefront: site.uid,
          categoryCode: site.defaultPreviewCategoryCode,
          catalogId: site.defaultPreviewCatalogId,
          productCode: site.defaultPreviewProductCode
        }
        // update fallback language
        i18n.fallbackLocale.value = site.defaultLanguage?.isocode || 'en'
        // set locales from store
        const { stores, urlEncodingAttributes } = site
        if (stores?.length) {
          const store = stores[0]
          currencies.value = store.currencies?.filter(c => c.active)
          languages.value = store.languages?.filter(l => l.active)
          const defaultCurrency = store.defaultCurrency?.isocode
          if (defaultCurrency) {
            currency.value = defaultCurrency
          }
          const defaultLanguage = browserLanguage
          if (defaultLanguage && languages.value?.map(l => l.isocode).includes(defaultLanguage)) {
            language.value = defaultLanguage
          }
          const segments = location.pathname.split('/')
          urlEncodingAttributes?.forEach((attr, i) => {
            switch (attr) {
              case UrlEncodingAttributes.LANGUAGE: {
                const val = contextMapper.fromLanguageUrlSegment(locale.value, segments[i + 1])
                if (!!val && languages.value?.map(l => l.isocode).includes(val)) {
                  language.value = val
                }
                break
              }
              case UrlEncodingAttributes.CURRENCY: {
                const val = contextMapper.fromCurrencyUrlSegment(locale.value, segments[i + 1])
                if (!!val && currencies.value?.map(c => c.isocode).includes(val)) {
                  currency.value = val
                }
                break
              }
            }
          })
        }
      }
    },
    { immediate: true }
  )

  return {
    languages,
    currencies,
    locale,
    language,
    currency,
    browserLanguage
  }
}
