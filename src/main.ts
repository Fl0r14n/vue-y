import { de } from '@/i18n/de'
import { en } from '@/i18n/en'
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
      history: createWebHistory(import.meta.env.BASE_URL),
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
      }
      // theme: {
      //   defaultTheme: 'light',
      //   themes: {
      //     light: {
      //       colors: {
      //         primary: '#1867C0',
      //         secondary: '#5CBBF6'
      //       }
      //     }
      //   }
      // }
    })
  )
  .mount('#app')
