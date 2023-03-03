import CmsSlot from '@/cms/components/CmsSlot.vue'
import { cmsData } from '@/cms/directives/cms-data'
import { provideCmsComponent } from '@/config'
import type { App } from 'vue'

export const createCms = () => ({
  install: (app: App) => {
    app.component('cms-slot', CmsSlot)
    app.directive('cms-data', cmsData)
    provideCmsComponent('SimpleResponsiveBannerComponent')(() => import('./components/CmsBanner.vue'))
    provideCmsComponent('CMSFlexComponent')(() => import('./components/CmsFlex.vue'))
    provideCmsComponent('SimpleBannerComponent')(() => import('./components/CmsImage.vue'))
    provideCmsComponent('JspIncludeComponent')(() => import('./components/CmsInclude.vue'))
    provideCmsComponent('CMSLinkComponent')(() => import('./components/CmsLink.vue'))
    provideCmsComponent('NavigationComponent')(() => import('./components/CmsNavigation.vue'))
    provideCmsComponent('CMSParagraphComponent')(() => import('./components/CmsParagraph.vue'))
    provideCmsComponent('CMSTabParagraphComponent')(() => import('./components/CmsParagraph.vue'))
    provideCmsComponent('ProductCarouselComponent')(() => import('./components/CmsProductCarousel.vue'))
    provideCmsComponent('CMSTabParagraphContainer')(() => import('./components/CmsTabContainer.vue'))
  }
})
