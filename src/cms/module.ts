import { cmsData } from '@/cms'
import CmsNode from '@/cms/components/CmsNode.vue'
import CmsSlot from '@/cms/components/CmsSlot.vue'
import SlidingCarousel from '@/cms/components/SlidingCarousel.vue'
import { provideCmsComponent } from '@/config'
import type { App } from 'vue'

export const createCms = () => ({
  install: (app: App) => {
    app.component('cms-slot', CmsSlot)
    app.component('cms-node', CmsNode)
    app.component('v-sliding-carousel', SlidingCarousel)
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
