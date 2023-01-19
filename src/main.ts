import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6'
          }
        }
      }
    }
  })
)

app.mount('#app')

console.log(import.meta.env.MODE)
console.log(typeof import.meta.env.VITE_API)
