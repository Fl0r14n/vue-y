import CmsSlot from '@/cms/components/CmsSlot.vue'
import { provideCmsComponent } from '@/config'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export const createCms = () => ({
  install: (app: App) => {
    app.component('cms-slot', CmsSlot)
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

    // provideCmsComponent('SimpleResponsiveBannerComponent')(defineAsyncComponent(() => import('./components/CmsBanner.vue')))
    // provideCmsComponent('CMSFlexComponent')(defineAsyncComponent(() => import('./components/CmsFlex.vue')))
    // provideCmsComponent('SimpleBannerComponent')(defineAsyncComponent(() => import('./components/CmsImage.vue')))
    // provideCmsComponent('JspIncludeComponent')(defineAsyncComponent(() => import('./components/CmsInclude.vue')))
    // provideCmsComponent('CMSLinkComponent')(defineAsyncComponent(() => import('./components/CmsLink.vue')))
    // provideCmsComponent('NavigationComponent')(defineAsyncComponent(() => import('./components/CmsNavigation.vue')))
    // provideCmsComponent('CMSParagraphComponent')(defineAsyncComponent(() => import('./components/CmsParagraph.vue')))
    // provideCmsComponent('CMSTabParagraphComponent')(defineAsyncComponent(() => import('./components/CmsParagraph.vue')))
    // provideCmsComponent('ProductCarouselComponent')(defineAsyncComponent(() => import('./components/CmsProductCarousel.vue')))
    // provideCmsComponent('CMSTabParagraphContainer')(defineAsyncComponent(() => import('./components/CmsTabContainer.vue')))
  }
})
