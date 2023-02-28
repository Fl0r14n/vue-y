import type { Config } from '@/api/config'
import { useConfig } from '@/api/config'
import { createOAuth } from '@/oauth'
import type { App } from 'vue'

export const createY = (cfg: Config) => {
  const install = (app: App) => {
    const config = useConfig()
    config.value = cfg
    cfg.oauth && app.use(createOAuth(cfg.oauth))
  }
  return { install }
}
