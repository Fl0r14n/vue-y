import { de } from '@/i18n/de'
import { en } from '@/i18n/en'

import '@mdi/font/scss/materialdesignicons.scss'
import { createOAuth } from '@/oauth'
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

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '',
      name: 'layout',
      component: () => import('./layout/views/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./home/views/HomeView.vue')
        }
      ]
    }
  ]
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
  .use(
    createOAuth({
      config: {
        issuerPath: VITE_OAUTH_ISSUER_PATH,
        authorizePath: VITE_OAUTH_AUTHORIZE_PATH,
        tokenPath: VITE_OAUTH_TOKEN_PATH,
        logoutPath: VITE_OAUTH_LOGOUT_PATH,
        logoutRedirectUri: VITE_OAUTH_LOGOUT_REDIRECT_URI,
        clientId: VITE_OAUTH_CLIENT_ID,
        clientSecret: VITE_OAUTH_CLIENT_SECRET,
        scope: VITE_OAUTH_SCOPE
      },
      router
    })
  )
  .mount('#app')
