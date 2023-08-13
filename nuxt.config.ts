// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  modules: [
    '@nuxthq/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-time'
  ],
  ui: {
    primary: 'pink-400',
    gray: 'cool'
  }
})
