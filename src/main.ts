import { de } from '@/i18n/de'
import { en } from '@/i18n/en'
import { createOAuth } from '@/oauth'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import App from './App.vue'

import '@mdi/font/scss/materialdesignicons.scss'
import './assets/main.scss'

const { BASE_URL, VITE_THEME, VITE_OAUTH_TOKEN_PATH, VITE_OAUTH_CLIENT_ID, VITE_OAUTH_CLIENT_SECRET } = import.meta.env

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})
createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(
    createRouter({
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
  )
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
        // tokenPath: VITE_OAUTH_TOKEN_PATH || '/authorizationserver/oauth/token',
        // clientId: VITE_OAUTH_CLIENT_ID || 'clientid',
        // clientSecret: VITE_OAUTH_CLIENT_SECRET
        issuerPath: 'http://localhost:8080/auth/realms/commerce',
        clientId: 'spartacus',
        logoutRedirectUri: 'http://localhost:4200'
      }
    })
  )
  .mount('#app')
