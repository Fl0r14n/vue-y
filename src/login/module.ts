import { getRouter, provideCmsComponent, provideCmsTemplate } from '@/config'
import { forgotPasswordGuard, logoutGuard, notLoginGuard } from '@/login/guards'
import type { App } from 'vue'

const userLoginImport = () => import('./components/UserLogin.vue')
const userRegisterImport = () => import('./components/UserRegister.vue')
const guestLoginImport = () => import('./components/GuestLogin.vue')

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
    provideCmsComponent('GuestCheckoutLoginComponent')(guestLoginImport)
    provideCmsComponent('checkoutGuestLogin.jsp')(guestLoginImport)
    provideCmsComponent('LoginComponent')(() => import('./components/Login.vue'))
    provideCmsComponent('GuestFormComponent')(() => import('./components/GuestForm.vue'))
    provideCmsComponent('LoginFormComponent')(() => import('./components/LoginForm.vue'))
    provideCmsComponent('ResetPasswordFormComponent')(() => import('./components/ResetPasswordForm.vue'))
    provideCmsComponent('RegisterFormComponent')(() => import('./components/RegisterForm.vue'))
    const router = getRouter(app)
    router.addRoute({
      path: '/login',
      name: 'login',
      component: () => import('../cms/components/CmsPage.vue'),
      meta: {
        id: 'login'
      },
      beforeEnter: notLoginGuard
    })
    router.addRoute({
      path: '/logout',
      name: 'logout',
      component: () => null as any,
      beforeEnter: logoutGuard
    })
    router.addRoute({
      path: '/login/pw/change',
      name: 'changePassword',
      component: () => null as any,
      beforeEnter: forgotPasswordGuard
    })
  }
})
