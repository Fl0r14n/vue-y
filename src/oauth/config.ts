import type { OAuthConfig, OAuthTypeConfig } from '@/oauth/models'
import { computed, ref } from 'vue'

export const oauthConfig = ref<OAuthConfig>({
  storage: localStorage,
  storageKey: 'token',
  ignorePaths: []
})

export const config = computed({
  get() {
    return oauthConfig.value.config as OAuthTypeConfig
  },
  set(config?: OAuthTypeConfig) {
    if (config) {
      oauthConfig.value.config = {
        ...oauthConfig.value.config,
        ...config
      }
    }
  }
})

export const ignoredPaths = computed(() => oauthConfig.value.ignorePaths)
