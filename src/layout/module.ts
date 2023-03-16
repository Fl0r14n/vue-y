import { provideCmsComponent, provideCmsTemplate } from '@/config'

export const createLayout = () => ({
  install: () => {
    provideCmsComponent('CategoryNavigationComponent')(() => import('./components/CategoryNavigation.vue'))
    provideCmsComponent('MiniCartComponent')(() => import('./components/MiniCart.vue'))
    provideCmsComponent('SearchBoxComponent')(() => import('./components/SearchBox.vue'))
    provideCmsComponent('ScrollToTopComponent')(() => import('./components/ScrollToTop.vue'))
    provideCmsComponent('AnonymousConsentManagementBannerComponent')(() => import('./components/ConsentBanner.vue'))
    provideCmsComponent('AnonymousConsentOpenDialogComponent')(() => import('./components/ConsentDialog.vue'))
    provideCmsTemplate('ContentPage1Template')(() => import('./templates/ContentPage1Template.vue'))
    provideCmsTemplate('ErrorPageTemplate')(() => import('./templates/ErrorPageTemplate.vue'))
    provideCmsTemplate('LandingPage2Template')(() => import('./templates/LandingPage2Template.vue'))
    provideCmsComponent('FooterNavigationComponent')(() => import('./components/FooterNavigation.vue'))
  }
})
