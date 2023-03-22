import { getRouter, provideCmsComponent, provideCmsTemplate } from '@/config'
import type { App } from 'vue'

const userLoginImport = () => import('./components/UserLogin.vue')
const userRegisterImport = () => import('./components/UserRegister.vue')

export const createLogin = () => ({
  install: (app: App) => {
    provideCmsTemplate('LoginPageTemplate')(() => import('./templates/LoginPageTemplate.vue'))
    provideCmsTemplate('CheckoutLoginPageTemplate')(() => import('./templates/LoginPageTemplate.vue'))
    provideCmsComponent('ReturningCustomerLoginComponent')(userLoginImport)
    provideCmsComponent('ReturningCustomerCheckoutLoginComponent')(userLoginImport)
    provideCmsComponent('accountReturningCustomerLogin.jsp')(userLoginImport)
    provideCmsComponent('checkoutReturningCustomerLogin.jsp')(userLoginImport)
    provideCmsComponent('ReturningCustomerRegisterComponent')(userRegisterImport)
    provideCmsComponent('accountNewCustomerLogin.jsp')(userRegisterImport)
    const router = getRouter(app)
    router.addRoute({
      path: '/login',
      name: 'login',
      component: () => import('../cms/components/CmsPage.vue'),
      meta: {
        id: 'login'
      }
      // beforeEnter:
    })
    router.addRoute({
      path: '/logout',
      name: 'logout',
      component: () => null as any
      // beforeEnter: (to, from) => to
    })
    router.addRoute({
      path: '/login/pw/change',
      name: 'changePassword',
      component: () => null as any
      // beforeEnter:
    })
  }
})
