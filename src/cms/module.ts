import { provideCmsComponent } from '@/config'

export const createCms = () => ({
  install: () => {
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
