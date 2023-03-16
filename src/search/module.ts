import { provideCmsTemplate } from '@/config'

export const createSearch = () => ({
  install: () => {
    provideCmsTemplate('CategoryPageTemplate')(() => import('./templates/CategoryPageTemplate.vue'))
  }
})
