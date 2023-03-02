import { getActivePinia } from 'pinia'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

export * from './locale.store'
export * from './site.store'

// WORKAROUND
export const useRouter = () => (getActivePinia() as any)?._a.config.globalProperties.$router! as Router
export const useRoute = () => (getActivePinia() as any)?._a.config.globalProperties.$route! as RouteLocationNormalizedLoaded
