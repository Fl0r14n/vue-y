import { siteGuard } from '@/cms'
import type { Config } from '@/config'
import { useConfig } from '@/config'
import { createOAuth } from '@/oauth'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface YModule {
  install: (app: App) => void
  useRouter: (router: Router) => YModule
}

export const createY = (cfg: Config) => {
  const module = {} as YModule
  const oauthModule = cfg.oauth && createOAuth(cfg.oauth)
  module.install = (app: App) => {
    // console.log(app._context.provides[routerKey])
    const config = useConfig()
    // first init default components
    // apply user config
    config.value = cfg
    oauthModule && app.use(oauthModule)
    console.log(config.value)
  }
  module.useRouter = (router: Router) => {
    oauthModule?.useRouter(router)
    router.beforeEach(siteGuard)
    return module
  }
  return module
}
