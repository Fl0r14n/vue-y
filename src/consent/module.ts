import { provideCmsComponent } from '@/config'

export const createConsent = () => ({
  install: () => {
    provideCmsComponent('AnonymousConsentManagementBannerComponent')(() => import('./components/ConsentBanner.vue'))
    provideCmsComponent('AnonymousConsentOpenDialogComponent')(() => import('./components/ConsentDialog.vue'))
  }
})
