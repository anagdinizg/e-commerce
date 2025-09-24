import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#e91e63',
          secondary: '#f06292',
          background: '#fce4ec',
          surface: '#ffffff',
          error: '#e91e63',
          info: '#f06292',
          success: '#4caf50',
          warning: '#ff9800',
          darkbg: '#000000',
          darkerbg: '#0d1117',
          lightgray: '#f8f9fa',
          textdark: '#212529',
          textlight: '#6c757d',
          textwhite: '#ffffff',
          borderlight: '#e9ecef',
        },
      },
    },
  },
})

app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')
