// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', '@pinia/nuxt', '@nuxt/ui','nuxt-pdfmake','nuxt-nodemailer'],
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
          preset: Aura,
          options: {
              prefix: 'p',
              cssLayer: false
          }
      }
  }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css','~/assets/css/default.css','bootstrap/dist/css/bootstrap.min.css'],

  plugins:[
    '~/plugins/date-to-string-abd',
    '~/plugins/format-decimal',
    '~/plugins/format-price-usd',
    '~/plugins/primevue-toastservice'
  ],
  nodemailer: {
    from: '"Bilgi İşlem" <bilgiislem@mekmar.com>',
    host: 'mail.mekmar.com',
    port: 587,
    auth: {
      user: 'goz@mekmar.com',
      pass: '_bwt64h-3SR_-G2O',
    },
    secure:false,
    // here it goes
    tls: {rejectUnauthorized: false},
    debug:true
  },
  nitro: {
    preset: 'node-server',
    prerender: {
      // crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
      // routes: ['/'],

      failOnError: false,
    },
  },
  vite: {
    server: {
        headers: {
            'Cache-Control': 'max-age=50000000'
        }
    }
  },

})