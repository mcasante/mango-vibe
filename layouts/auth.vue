<script lang="ts" setup>

</script>

<template>
  <div class="app-container h-[100vh] flex flex-col">
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