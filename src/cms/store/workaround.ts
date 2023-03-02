// WORKAROUND
import { getActivePinia } from 'pinia'
import type { Router } from 'vue-router'

export const useRouter = () => (getActivePinia() as any)?._a.config.globalProperties.$router! as Router
// export const useRoute = () => (getActivePinia() as any)?._a.config.globalProperties.$route! as RouteLocationNormalizedLoaded
