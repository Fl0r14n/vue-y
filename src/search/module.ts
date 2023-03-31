import { PageType } from '@/api'
import { getRouter, provideCmsComponent, provideCmsTemplate } from '@/config'
import { categoryGuard, searchGuard } from '@/search/store'
import type { App } from 'vue'

const productListPageImport = () => import('./templates/ProductListPageTemplate.vue')
const searchResultPageImport = () => import('./templates/SearchResultsListPageTemplate.vue')
const productListComponent = () => import('./components/ProductList.vue')
const productGridComponent = () => import('./components/ProductGrid.vue')
export const createSearch = () => ({
  install: (app: App) => {
    provideCmsTemplate('CategoryPageTemplate')(() => import('./templates/CategoryPageTemplate.vue'))
    provideCmsTemplate('SearchResultsListPageTemplate')(searchResultPageImport)
    provideCmsTemplate('SearchResultsGridPageTemplate')(searchResultPageImport)
    provideCmsTemplate('ProductListPageTemplate')(productListPageImport)
    provideCmsTemplate('ProductGridPageTemplate')(productListPageImport)
    provideCmsComponent('ProductRefinementComponent')(() => import('./components/ProductRefinement.vue'))
    provideCmsComponent('CMSProductListComponent')(productListComponent)
    provideCmsComponent('SearchResultsListComponent')(productListComponent)
    provideCmsComponent('ProductGridComponent')(productGridComponent)
    provideCmsComponent('SearchResultsGridComponent')(productGridComponent)
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
