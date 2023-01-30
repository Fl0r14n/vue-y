import type {
  ApiConfig,
  AsmConfig,
  AuthConfig,
  CartConfig,
  CheckoutConfig,
  Config,
  I18nConfig,
  LocaleConfig,
  MediaConfig,
  SiteConfig
} from '@/yapi/config'
import { apiConfig, authConfig, config, mediaConfig, siteConfig } from '@/yapi/config'
import type { App, InjectionKey, Ref, WritableComputedRef } from 'vue'
import { inject } from 'vue'

export const CONFIG = Symbol('Config') as InjectionKey<Ref<Config>>
export const AUTH_CONFIG = Symbol('AuthConfig') as InjectionKey<WritableComputedRef<AuthConfig>>
export const SITE_CONFIG = Symbol('SiteConfig') as InjectionKey<WritableComputedRef<SiteConfig>>
export const API_CONFIG = Symbol('ApiConfig') as InjectionKey<WritableComputedRef<ApiConfig>>
export const MEDIA_CONFIG = Symbol('MediaConfig') as InjectionKey<WritableComputedRef<MediaConfig>>
export const CART_CONFIG = Symbol('CartConfig') as InjectionKey<WritableComputedRef<CartConfig>>
export const CHECKOUT_CONFIG = Symbol('CheckoutConfig') as InjectionKey<WritableComputedRef<CheckoutConfig>>
export const LOCALE_CONFIG = Symbol('LocaleConfig') as InjectionKey<WritableComputedRef<LocaleConfig>>
export const I18N_CONFIG = Symbol('I18nConfig') as InjectionKey<WritableComputedRef<I18nConfig>>
export const ASM_CONFIG = Symbol('AsmConfig') as InjectionKey<WritableComputedRef<AsmConfig>>

export const createY = (cfg: any) => {
  const install = (app: App) => {
    app.provide(CONFIG, config)
    app.provide(AUTH_CONFIG, authConfig)
    app.provide(SITE_CONFIG, siteConfig)
    app.provide(API_CONFIG, apiConfig)
    app.provide(MEDIA_CONFIG, mediaConfig)
    // app.use()
  }

  return { install }
}

export const useConfig = () => inject(CONFIG)!
