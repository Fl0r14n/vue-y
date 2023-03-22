import type { Config } from '@/config/config'
import { useConfig } from '@/config/config'
import { createOAuth } from '@/oauth'
import type { App } from 'vue'
import { type Router, routerKey } from 'vue-router'

export const getRouter = (app: App) => app._context.provides[routerKey as any] as Router

export const createConfig = (cfg: Config) => ({
  install: (app: App) => {
    const config = useConfig()
    config.value = cfg
    console.log(config.value)
    cfg.oauth && app.use(createOAuth(cfg.oauth))
  }
})
