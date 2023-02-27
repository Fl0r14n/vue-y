import { createBaseSiteApi } from '@/api/base'
import type {
  ApiConfig,
  AsmConfig,
  AuthConfig,
  CacheConfig,
  CartConfig,
  CheckoutConfig,
  CmsConfig,
  Config,
  I18nConfig,
  LocaleConfig,
  MediaConfig,
  SiteConfig
} from '@/api/config'
import {
  apiConfig,
  asmConfig,
  authConfig,
  cacheConfig,
  cartConfig,
  checkoutConfig,
  cmsConfig,
  config,
  i18nConfig,
  localeConfig,
  mediaConfig,
  mergeDeep,
  siteConfig
} from '@/api/config'
import { createOAuth } from '@/oauth'
import type { App, InjectionKey, Ref, WritableComputedRef } from 'vue'
import { inject } from 'vue'

export const CONFIG = Symbol('Config') as InjectionKey<Ref<Config>>
export const AUTH_CONFIG = Symbol('AuthConfig') as InjectionKey<WritableComputedRef<AuthConfig['oauth']>>
export const SITE_CONFIG = Symbol('SiteConfig') as InjectionKey<WritableComputedRef<SiteConfig['site']>>
export const API_CONFIG = Symbol('ApiConfig') as InjectionKey<WritableComputedRef<ApiConfig['api']>>
export const MEDIA_CONFIG = Symbol('MediaConfig') as InjectionKey<WritableComputedRef<MediaConfig['media']>>
export const CART_CONFIG = Symbol('CartConfig') as InjectionKey<WritableComputedRef<CartConfig['cart']>>
export const CHECKOUT_CONFIG = Symbol('CheckoutConfig') as InjectionKey<WritableComputedRef<CheckoutConfig['checkout']>>
export const LOCALE_CONFIG = Symbol('LocaleConfig') as InjectionKey<WritableComputedRef<LocaleConfig['locale']>>
export const I18N_CONFIG = Symbol('I18nConfig') as InjectionKey<WritableComputedRef<I18nConfig['i18n']>>
export const ASM_CONFIG = Symbol('AsmConfig') as InjectionKey<WritableComputedRef<AsmConfig['asm']>>
export const CMS_CONFIG = Symbol('CmsConfig') as InjectionKey<WritableComputedRef<CmsConfig['cms']>>
export const CACHE_CONFIG = Symbol('CacheConfig') as InjectionKey<WritableComputedRef<CacheConfig['cache']>>

export const createY = (cfg: Config) => {
  const install = (app: App) => {
    config.value = mergeDeep(config.value, cfg)
    app.provide(CONFIG, config)
    app.provide(AUTH_CONFIG, authConfig)
    app.provide(SITE_CONFIG, siteConfig)
    app.provide(API_CONFIG, apiConfig)
    app.provide(MEDIA_CONFIG, mediaConfig)
    app.provide(CART_CONFIG, cartConfig)
    app.provide(CHECKOUT_CONFIG, checkoutConfig)
    app.provide(LOCALE_CONFIG, localeConfig)
    app.provide(I18N_CONFIG, i18nConfig)
    app.provide(ASM_CONFIG, asmConfig)
    app.provide(CMS_CONFIG, cmsConfig)
    app.provide(CACHE_CONFIG, cacheConfig)
    cfg.oauth && app.use(createOAuth(cfg.oauth))

    app.use(createBaseSiteApi())
  }
  return { install }
}

export const useConfig = () => inject(CONFIG)!
export const useAuthConfig = () => inject(AUTH_CONFIG)!
export const useSiteConfig = () => inject(SITE_CONFIG)!
export const useApiConfig = () => inject(API_CONFIG)!
export const useMediaConfig = () => inject(MEDIA_CONFIG)!
export const useCartConfig = () => inject(CART_CONFIG)!
export const useCheckoutConfig = () => inject(CHECKOUT_CONFIG)!
export const useLocaleConfig = () => inject(LOCALE_CONFIG)!
export const useI18nConfig = () => inject(I18N_CONFIG)!
export const useAsmConfig = () => inject(ASM_CONFIG)!
export const useCmsConfig = () => inject(CMS_CONFIG)!
export const useCacheConfig = () => inject(CACHE_CONFIG)!
