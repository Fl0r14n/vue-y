import { PageType } from '@/api'
import { getRouter, provideCmsComponent, provideCmsTemplate } from '@/config'
import { productGuard } from '@/product/store'
import type { App } from 'vue'

const productListImport = () => import('./components/ProductList.vue')
const productGridImport = () => import('./components/ProductGrid.vue')
export const createProduct = () => ({
  install: (app: App) => {
    provideCmsTemplate('ProductDetailsPageTemplate')(() => import('./templates/ProductDetailsPageTemplate.vue'))
    provideCmsComponent('ProductRefinementComponent')(() => import('./components/ProductRefinement.vue'))
    provideCmsComponent('CMSProductListComponent')(productListImport)
    provideCmsComponent('SearchResultsListComponent')(productListImport)
    provideCmsComponent('ProductGridComponent')(productGridImport)
    provideCmsComponent('SearchResultsGridComponent')(productGridImport)
    const router = getRouter(app)
    router.addRoute({
      path: '/:more*/p/:id',
      name: 'product',
      component: () => import('../cms/components/CmsPage.vue'),
      meta: {
        pageType: PageType.PRODUCT
      },
      beforeEnter: productGuard
    })
  }
})
