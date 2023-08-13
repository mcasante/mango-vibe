<script setup lang="ts">
// define emit
const emit = defineEmits<{
  (e: 'capture', file: string | ArrayBuffer | null): void
}>()

const modal = reactive({
  visible: false,
  reveal: () => modal.visible = true,
})

const { files, open } = useFileDialog({ accept: 'image/*' })

watchEffect(async () => {
  const file = files.value?.[0]
  if (!file)
    return

  const reader = new FileReader()
  const result = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    reader.addEventListener('load', (e) => {
      const result = e.target?.result
      if (!result)
        return

      resolve(result)
    })
    reader.addEventListener('error', e => reject(e))
    reader.readAsDataURL(file)
  })

  emit('capture', result)
  return result
})
</script>

<template>
  <UButton v-bind="$attrs" class="add-meal-button flex justify-center items-center" @click="open">
    <UIcon name="i-heroicons-camera" />
  </UButton>
</template>

<style lang="postcss" scoped>
.add-meal-button {
  @apply relative text-black w-full h-full bg-white;
  border-radius: 16px;
  font-size: 100px;
}
</style>