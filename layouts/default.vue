<script lang="ts" setup>

</script>

<template>
  <div class="app-container h-[100vh] flex flex-col">
    <div class="w-full bg-white px-4 py-2">
      <NuxtPicture width="96" src="/images/mango-vibe-logo.svg" />
    </div>
    <UContainer class="grow max-w-full" :ui="{ padding: 0 }">
      <Suspense>
        <slot/>
        <template #fallback>
          <div>
            loading...
          </div>
        </template>
      </Suspense>
    </UContainer>
  </div>
</template>

<style lang="postcss" scoped>

</style>