// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  server: {
    host: "0",
  },
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  },
  css: ["~/assets/global.css"],
  modules: [
    "@nuxthq/ui",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-time",
    "@samk-dev/nuxt-vcalendar",
  ],
  components: ["~/components/atoms", "~/components"],
  ui: {
    primary: "pink",
    gray: "cool",
  },
  colorMode: {
    preference: "light",
  },
});
