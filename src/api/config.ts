import type { BaseSiteData, CMSPageData, ComponentData, PageType, ProductData } from '@/api/models'
import type { OAuthConfig } from '@/oauth'
import { computed, ref } from 'vue'

export interface AuthConfig {
  oauth?: OAuthConfig
}

const defaultAuthConfig: AuthConfig = {
  oauth: {}
}

export interface SiteConfig {
  site?: BaseSiteData
}

const defaultSiteConfig: SiteConfig = {
  site: {} as any
}

export interface ApiConfig {
  api?: {
    host?: string
    path?: string
    overlappingPaths?: boolean
  }
}

const defaultApiConfig: ApiConfig = {
  api: {
    host: '',
    path: '/occ/v2',
    overlappingPaths: true
  }
}

export interface MediaConfig {
  media?: {
    missingImage?: string
    breakpoints?: Record<string, string>
  }
}

const defaultMediaConfig: MediaConfig = {
  media: {
    missingImage: 'assets/img/missing_product_EN_300x300.jpg',
    breakpoints: {
      mobile: '576w',
      tablet: '768w',
      desktop: '992w',
      widescreen: '1200w'
    }
  }
}

export interface CartConfig {
  cart?: {
    mergeCart?: boolean
    maxUploadSize?: number
  }
}

const defaultCartConfig: CartConfig = {
  cart: {
    mergeCart: true,
    maxUploadSize: 10240
  }
}

export interface CheckoutConfig {
  checkout?: {
    flows?: Record<string, string[]>
  }
}

const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {}
}

export interface LocaleConfig {
  locale?: {
    storefront?: string
    language?: string
    currency?: string
    catalogId?: string
    catalogVersion?: string
    productCode?: string
    categoryCode?: string
    pageSize?: number
  }
}

const defaultLocaleConfig: LocaleConfig = {
  locale: {
    language: 'en',
    currency: 'USD',
    catalogVersion: 'Online',
    pageSize: 10
  }
}

export interface I18nConfig {
  i18n?: Record<string, any>
}

const defaultI18nConfig: I18nConfig = {
  i18n: {
    en: {}
  }
}

export interface AsmConfig {
  asm?: {
    path?: string
    timeout?: number
  }
}

const defaultAsmConfig: AsmConfig = {
  asm: {
    path: '/assistedservicewebservices',
    timeout: 600
  }
}

export interface CmsPageItem
  extends Partial<
    Record<
      PageType | string,
      {
        uids?: Record<string, CMSPageData>
      }
    >
  > {}

/**
 * CMS template object structure
 */
export interface CmsTemplateItem
  extends Record<
    string,
    {
      template?: any
      uids?: Record<string, any>
    }
  > {}

/**
 * Binds together a backend typeCode to a angular component
 */
export interface CmsComponentItem
  extends Record<
    string,
    {
      component?: any
      uids?: Record<string, any>
    }
  > {}

export interface CmsConfig {
  cms?: {
    components?: CmsComponentItem
    templates?: CmsTemplateItem
    pages?: CmsPageItem
  }
}

const defaultCmsConfig: CmsConfig = {
  cms: {
    components: {},
    templates: {},
    pages: {}
  }
}

export interface CacheConfig {
  cache?: {
    components?: Record<string, ComponentData[]>
    products?: Record<string, ProductData[]>

    [x: string]: any
  }
}

const defaultCacheConfig: CacheConfig = {
  cache: {
    components: {},
    products: {}
  }
}

export interface ProviderConfig {
  providers?: Record<string, any>
}

const defaultProviderConfig: ProviderConfig = {
  providers: {}
}

export interface Config
  extends AuthConfig,
    SiteConfig,
    ApiConfig,
    MediaConfig,
    CartConfig,
    CheckoutConfig,
    LocaleConfig,
    I18nConfig,
    AsmConfig,
    CmsConfig,
    CacheConfig,
    ProviderConfig {
  production?: boolean

  [x: string]: any
}

const config = ref<Config>({
  production: false,
  ...defaultAuthConfig,
  ...defaultSiteConfig,
  ...defaultApiConfig,
  ...defaultMediaConfig,
  ...defaultCartConfig,
  ...defaultCheckoutConfig,
  ...defaultLocaleConfig,
  ...defaultI18nConfig,
  ...defaultAsmConfig,
  ...defaultCmsConfig,
  ...defaultCacheConfig,
  ...defaultProviderConfig
})

export const isObject = (item: any): boolean => item && typeof item === 'object' && !Array.isArray(item)
export const mergeDeep = (target: any, source: any) => {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = mergeDeep(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

const partialConfig = <T>(property: string) =>
  computed({
    get() {
      return config.value[property] as T
    },
    set(cfg) {
      cfg && (config.value[property] = mergeDeep(config.value[property], cfg))
    }
  })

export const useConfig = () =>
  computed({
    get() {
      return config.value
    },
    set(cfg) {
      cfg && (config.value = mergeDeep(config.value, cfg))
    }
  })
export const useAuthConfig = () => partialConfig<AuthConfig['oauth']>('oauth')
export const useSiteConfig = () => partialConfig<SiteConfig['site']>('site')
export const useApiConfig = () => partialConfig<ApiConfig['api']>('api')
export const useMediaConfig = () => partialConfig<MediaConfig['media']>('media')
export const useCartConfig = () => partialConfig<CartConfig['cart']>('cart')
export const useCheckoutConfig = () => partialConfig<CheckoutConfig['checkout']>('checkout')
export const useLocaleConfig = () => partialConfig<LocaleConfig['locale']>('locale')
export const useI18nConfig = () => partialConfig<I18nConfig['i18n']>('i18n')
export const useAsmConfig = () => partialConfig<AsmConfig['asm']>('asm')
export const useCmsConfig = () => partialConfig<CmsConfig['cms']>('cms')
export const useCacheConfig = () => partialConfig<CacheConfig['cache']>('cache')
export const useProviderConfig = () => partialConfig<ProviderConfig['providers']>('providers')

export declare interface AbstractType<T> extends Function {
  prototype: T
}

export declare interface Type<T> extends Function {
  new?(...args: any[]): T
}

export declare type ProviderToken<T> = Type<T> | AbstractType<T> | string

const injectionKey = <T>(key: ProviderToken<T>) => (typeof key === 'string' && key) || (key as any).name

export const provide = <T>(key: ProviderToken<T>, value: T) => {
  const providers = useProviderConfig()
  const providerKey = injectionKey(key)
  if (providerKey && providers.value) {
    providers.value[providerKey] = value
  }
}

export const inject = <T>(key: ProviderToken<T>, defaultValue?: T): T => {
  const providers = useProviderConfig()
  const providerKey = injectionKey(key)
  let result
  if (providerKey && providers.value) {
    const value = providers.value[providerKey]
    if (!value && defaultValue) {
      provide(key, defaultValue)
      result = inject<T>(key)
    } else {
      result = value
    }
  }
  return result as T
}

export class LocaleContextMapper {
  toStorefrontUrlSegment(context: LocaleConfig['locale']) {
    return context?.storefront || ''
  }

  toLanguageUrlSegment(context: LocaleConfig['locale']) {
    return context?.language || ''
  }

  toCurrencyUrlSegment(context: LocaleConfig['locale']) {
    return context?.currency || ''
  }

  fromLanguageUrlSegment(context: LocaleConfig['locale'], urlSegment?: string) {
    return urlSegment
  }

  fromCurrencyUrlSegment(context: LocaleConfig['locale'], urlSegment?: string) {
    return urlSegment
  }
}

export const useLocaleContextMapper = () => inject(LocaleContextMapper, new LocaleContextMapper())
