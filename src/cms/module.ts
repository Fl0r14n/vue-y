import { cmsData, siteGuard } from '@/cms'
import CmsNode from '@/cms/components/CmsNode.vue'
import CmsSlot from '@/cms/components/CmsSlot.vue'
import SlidingCarousel from '@/cms/components/SlidingCarousel.vue'
import { getRouter, provideCmsComponent } from '@/config'
import type { App } from 'vue'

export const createCms = () => ({
  install: (app: App) => {
    const router = getRouter(app)
    router.beforeEach(siteGuard)
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
    provideCmsComponent('CMSSiteContextComponent')(() => import('./components/CmsSiteContext.vue'))
    router.addRoute({
      path: '/',
      name: 'home',
      component: () => import('./components/CmsPage.vue')
    })
    router.addRoute({
      path: '/cx-preview',
      name: 'smartedit',
      component: () => import('./components/CmsPage.vue')
    })
    router.addRoute({
      path: '/not-found',
      name: 'notFound',
      component: () => import('./components/CmsPage.vue'),
      meta: {
        id: 'not-found'
      }
    })
    router.addRoute({
      path: '/:id',
      name: 'content',
      component: () => import('./components/CmsPage.vue')
    })
  }
})
