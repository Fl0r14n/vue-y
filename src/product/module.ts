import { provideCmsTemplate } from '@/config'

export const createProduct = () => ({
  install: () => {
    provideCmsTemplate('ProductDetailsPageTemplate')(() => import('./templates/ProductDetailsPageTemplate.vue'))
  }
})
