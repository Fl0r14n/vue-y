import { provideCmsComponent, provideCmsTemplate } from '@/config'
import LayoutPage from '@/layout/pages/LayoutPage.vue'
import type { App } from 'vue'

export const createLayout = () => ({
  install: (app: App) => {
    app.component('cms-layout', LayoutPage)
    provideCmsComponent('CategoryNavigationComponent')(() => import('./components/CategoryNavigation.vue'))
    provideCmsComponent('SearchBoxComponent')(() => import('./components/SearchBox.vue'))
    provideCmsComponent('ScrollToTopComponent')(() => import('./components/ScrollToTop.vue'))
    provideCmsTemplate('ContentPage1Template')(() => import('./templates/ContentPage1Template.vue'))
    provideCmsTemplate('ErrorPageTemplate')(() => import('./templates/ErrorPageTemplate.vue'))
    provideCmsTemplate('LandingPage2Template')(() => import('./templates/LandingPage2Template.vue'))
    provideCmsComponent('FooterNavigationComponent')(() => import('./components/FooterNavigation.vue'))
  }
})
