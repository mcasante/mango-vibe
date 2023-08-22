<script lang="ts" setup>

</script>

<template>
  <div class="app-container h-[100vh] flex flex-col">
    <div class="w-full bg-white border-b-black border-b-[3px] px-4 py-2 flex justify-center items-center">
      <NuxtPicture width="96" src="/images/mango-vibe-logo.svg" />
    </div>
    <UContainer class="grow w-full" :ui="{ padding: 0 }">
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