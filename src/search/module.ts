import { PageType } from '@/api'
import { getRouter, provideCmsTemplate } from '@/config'
import { categoryGuard, searchGuard } from '@/search/store'
import type { App } from 'vue'

const productListPageImport = () => import('./templates/ProductListPageTemplate.vue')
const searchResultPageImport = () => import('./templates/SearchResultsListPageTemplate.vue')
export const createSearch = () => ({
  install: (app: App) => {
    provideCmsTemplate('CategoryPageTemplate')(() => import('./templates/CategoryPageTemplate.vue'))
    provideCmsTemplate('SearchResultsListPageTemplate')(searchResultPageImport)
    provideCmsTemplate('SearchResultsGridPageTemplate')(searchResultPageImport)
    provideCmsTemplate('ProductListPageTemplate')(productListPageImport)
    provideCmsTemplate('ProductGridPageTemplate')(productListPageImport)
    const router = getRouter(app)
    router.addRoute({
      path: '/search',
      name: 'search',
      component: () => import('../cms/components/CmsPage.vue'),
      beforeEnter: searchGuard,
      meta: {
        id: 'search'
      }
    })
    router.addRoute({
      path: '/:more*/c/:id',
      name: 'category',
      component: () => import('../cms/components/CmsPage.vue'),
      meta: {
        pageType: PageType.CATEGORY
      },
      beforeEnter: categoryGuard
    })
  }
})
