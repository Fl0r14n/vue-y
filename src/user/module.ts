import { getRouter, provideCmsTemplate } from '@/config'
import type { App } from 'vue'

export const createUser = () => ({
  install: (app: App) => {
    provideCmsTemplate('AccountPageTemplate')(() => import('./templates/AccountPageTemplate.vue'))
    const router = getRouter(app)
    router.addRoute({
      path: '/my-account/:id',
      name: 'account',
      component: () => import('../cms/components/CmsPage.vue')
    })
  }
})
