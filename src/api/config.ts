import type { OAuthConfig } from '@/oauth'
import type { BaseSiteData, CMSPageData, ComponentData, PageType, ProductData } from '@/api/models'
import { computed, ref } from 'vue'

export interface AuthConfig {
  oauth?: OAuthConfig
}

export interface SiteConfig {
  site?: BaseSiteData
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
    CacheConfig {
  production?: boolean

  [x: string]: any
}

export const config = ref<Config>({
  production: false,
  ...defaultApiConfig,
  ...defaultMediaConfig,
  ...defaultCartConfig,
  ...defaultCheckoutConfig,
  ...defaultLocaleConfig,
  ...defaultI18nConfig,
  ...defaultAsmConfig,
  ...defaultCmsConfig,
  ...defaultCacheConfig
})

export const partialConfig = <T>(property: string) =>
  computed({
    get() {
      return config.value[property] as T
    },
    set(cfg) {
      cfg && (config.value[property] = cfg)
    }
  })

export const authConfig = partialConfig<AuthConfig>('oauth')
export const siteConfig = partialConfig<SiteConfig>('site')
export const apiConfig = partialConfig<ApiConfig>('api')
export const mediaConfig = partialConfig<MediaConfig>('media')
export const cartConfig = partialConfig<CartConfig>('cart')
export const checkoutConfig = partialConfig<CheckoutConfig>('checkout')
export const localeConfig = partialConfig<LocaleConfig>('locale')
export const i18nConfig = partialConfig<I18nConfig>('i18n')
export const asmConfig = partialConfig<AsmConfig>('asm')
export const cmsConfig = partialConfig<CmsConfig>('cms')
export const cacheConfig = partialConfig<CacheConfig>('cache')
