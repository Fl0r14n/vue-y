import {
  createBaseSiteResource,
  createBaseStoreResource,
  createCatalogResource,
  createCountryResource,
  createMiscResource,
  createPaymentModesResource
} from '@/api/base'
import type { Config } from '@/api/config'
import { useConfig } from '@/api/config'
import { createOAuth } from '@/oauth'
import type { App } from 'vue'

export const createY = (cfg: Config) => {
  const install = (app: App) => {
    const config = useConfig()
    config.value = cfg
    cfg.oauth && app.use(createOAuth(cfg.oauth))

    app.use(createBaseSiteResource())
    app.use(createBaseStoreResource())
    app.use(createCatalogResource())
    app.use(createCountryResource())
    app.use(createMiscResource())
    app.use(createPaymentModesResource())
  }
  return { install }
}
