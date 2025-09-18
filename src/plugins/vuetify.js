import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#e91e63',
          secondary: '#f06292',
          background: '#ffffff',
          surface: '#ffffff',
          textdark: '#212529',
          textlight: '#666666',
          textgray: '#777777',
          textsoft: '#cccccc',
          darkbg: '#000000',
          darkergray: '#333333',
          lightgray: '#e0e0e0',
          lightbg: '#f8f9fa',
        },
      },
    },
  },
})
