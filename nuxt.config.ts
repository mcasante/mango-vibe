// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  server: { host: "0" },
  devtools: { enabled: true },
  app: {
    head: {
      title: "Mango",
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
    "nuxt-vuefire",
  ],
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyCcPhmtdHuJWLQPIvyzHFlbBiHLohzxp1Q",
      authDomain: "mango-vibe-d0384.firebaseapp.com",
      projectId: "mango-vibe-d0384",
      storageBucket: "mango-vibe-d0384.appspot.com",
      messagingSenderId: "343927437053",
      appId: "1:343927437053:web:1c36397646dad9d2183094",
      measurementId: "G-FYJH8D3YSQ",
    },
  },
  components: ["~/components/atoms", "~/components"],
  colorMode: {
    preference: "light",
  },
  ui: {
    icons: ["heroicons", "logos"],
  },
});
