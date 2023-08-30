<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

// we don't need this watcher on server
onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/auth/signin')
    } else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect)
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'blur',
      mode: 'out-in'
    }" />
  </NuxtLayout>
</template>


<style>
  .blur-enter-active,
  .blur-leave-active {
    transition: all 0.4s;
  }
  .blur-enter-from,
  .blur-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>