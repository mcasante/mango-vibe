<script setup lang="ts">
const props = defineProps<{
  label?: string
  placeholder?: string
  name: string
  type: string
  value: string
}>()

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const input = ref()
const { focused } = useFocus(input)

const valueCopy = ref(props.value)

const handleInput = (e: Event) => {
  valueCopy.value = (e.target as HTMLInputElement).value
  emit('update:value', valueCopy.value)
}
</script>

<template>
  <div
    :class="{ 'border-solid brutal brutal--translate bg-white!': focused }"
    class="brutal-translate relative py-2 px-4 rounded-lg transition border-black border-[3px] border-dashed bg-white/80"
  >
    <m-transition-expand name="blur">
      <label
        v-if="label && !valueCopy.length"
        ref="label"
        class="block"
        :for="name"
      >
        <h4 class="mb-2 text-4" v-text="label" />
      </label>
    </m-transition-expand>
    <input
      :id="name" ref="input" :value="props.value" @input="handleInput" :type="type"
      :placeholder="placeholder"
      class="bg-transparent placeholder-black/20 text-5 font-bold outline-none w-full h-full"
    >
  </div>
</template>

<style lang="scss" scoped>

</style>
