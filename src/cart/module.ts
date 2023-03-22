import { provideCmsComponent, provideCmsTemplate } from '@/config'

export const createCart = () => ({
  install: () => {
    provideCmsTemplate('CartPageTemplate')(() => import('./templates/CartPageTemplate.vue'))
    provideCmsComponent('MiniCartComponent')(() => import('./components/MiniCart.vue'))
  }
})
