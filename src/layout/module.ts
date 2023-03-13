import { provideCmsComponent, provideCmsTemplate } from '@/config'

export const createLayout = () => ({
  install: () => {
    provideCmsTemplate('ContentPage1Template')(() => import('./templates/ContentPage1Template.vue'))
    provideCmsTemplate('ErrorPageTemplate')(() => import('./templates/ErrorPageTemplate.vue'))
    provideCmsTemplate('LandingPage2Template')(() => import('./templates/LandingPage2Template.vue'))
    provideCmsComponent('FooterNavigationComponent')(() => import('./components/FooterNavigation.vue'))
  }
})
