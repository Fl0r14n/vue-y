import { provideCmsTemplate } from '@/config'

export const createLogin = () => ({
  install: () => {
    provideCmsTemplate('LoginPageTemplate')(() => import('./templates/LoginPageTemplate.vue'))
    provideCmsTemplate('CheckoutLoginPageTemplate')(() => import('./templates/LoginPageTemplate.vue'))
  }
})
