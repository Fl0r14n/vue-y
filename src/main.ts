import { createCart } from '@/cart'
import { createCms } from '@/cms'
import type { Config } from '@/config'
import { createConfig } from '@/config'
import { createConsent } from '@/consent'
import { de } from '@/i18n/de'
import { en } from '@/i18n/en'
import { createLayout } from '@/layout'
import { createLogin } from '@/login'
import { createProduct } from '@/product'
import { createSearch } from '@/search'

import '@mdi/font/scss/materialdesignicons.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import App from './App.vue'
import './assets/main.scss'

const {
  BASE_URL,
  VITE_THEME,
  VITE_OAUTH_ISSUER_PATH,
  VITE_OAUTH_AUTHORIZE_PATH,
  VITE_OAUTH_TOKEN_PATH,
  VITE_OAUTH_LOGOUT_PATH,
  VITE_OAUTH_LOGOUT_REDIRECT_URI,
  VITE_OAUTH_CLIENT_ID,
  VITE_OAUTH_CLIENT_SECRET,
  VITE_OAUTH_SCOPE
} = import.meta.env

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/my-account/:id',
      name: 'account',
      component: () => import('./cms/components/CmsPage.vue')
    }
  ]
})

const config: Config = {
  // site: {
  //   uid: 'electronics-spa'
  // },
  oauth: {
    config: {
      issuerPath: VITE_OAUTH_ISSUER_PATH,
      authorizePath: VITE_OAUTH_AUTHORIZE_PATH,
      tokenPath: VITE_OAUTH_TOKEN_PATH,
      logoutPath: VITE_OAUTH_LOGOUT_PATH,
      logoutRedirectUri: VITE_OAUTH_LOGOUT_REDIRECT_URI,
      clientId: VITE_OAUTH_CLIENT_ID,
      clientSecret: VITE_OAUTH_CLIENT_SECRET,
      scope: VITE_OAUTH_SCOPE
    }
  },
  api: {
    host: 'https://localhost:9002'
  },
  i18n: {
    en,
    de
  }
}

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  messages: config.i18n
})

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .use(
    createVuetify({
      blueprint: md1,
      locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n } as any)
      },
      theme: {
        defaultTheme: VITE_THEME || 'light'
        // themes: {
        //   light: {
        //     colors: {
        //       primary: '#1867C0',
        //       secondary: '#5CBBF6'
        //     }
        //   }
        // }
      }
    })
  )
  .use(createConfig(config))
  .use(createCms())
  .use(createLayout())
  .use(createConsent())
  .use(createLogin())
  .use(createProduct())
  .use(createSearch())
  .use(createCart())
  .mount('#app')
