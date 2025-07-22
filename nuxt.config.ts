import { encodeConfig } from './cli/decodeEnv'
import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: ['~/assets/styles/index.scss'],

  app: {
    pageTransition: pageTransition as any,
  },

  typescript: {
    strict: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/helpers/index.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },

  eslint: {
    config: {
      typescript: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
    ],
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR' },
      { code: 'en', language: 'en-GB' },
    ],
    detectBrowserLanguage: false,
    defaultLocale: 'fr',
  },

  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },

  runtimeConfig: {
    public: {
      value: encodeConfig({
        ENVIROMENT: process.env.NODE_ENV,
      }),
    },
  },
})
