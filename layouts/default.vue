<script lang="ts" setup>
const isOpen = ref(false)

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
})
</script>

<template>
  <div class="app-container h-[100vh] flex flex-col">
    <div class="w-full bg-white border-b-black border-b-[3px] px-4 py-2 flex justify-between items-center">
      <ULink to="/">
        <NuxtPicture width="96" src="/images/mango-vibe-logo.svg" />
      </ULink>
      <MButton size="lg" @click="isOpen = true">
        <UIcon name="i-heroicons-bars-3" />
      </MButton>
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
    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Slideover
            </h3>
            <MButton class="!bg-red-500 w-8 h-8 text-white font-bold !p-1" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>

      </UCard>
    </USlideover>
  </div>
</template>

<style lang="postcss" scoped>

</style>