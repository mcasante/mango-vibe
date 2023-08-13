<script setup lang="ts">
defineProps<{
  link?: string
}>()

const defaults = 'px-3 py-1 transition text-black brutal'
const hover = ' transition-shadow-0! hover:shadow-[calc(1.2*var(--brutal-shadow-size)) calc(1.2*var(--brutal-shadow-size)) 0 black] hover:translate-y-[calc(-0.2*var(--brutal-shadow-size))]'
const active = 'active:shadow-none relative active:brutal-translate'

const classes = [defaults, hover, active].join(' ')
</script>

<template>
  <UButton v-if="!link" v-bind="$attrs" :class="classes">
    <slot />
  </UButton>
  <UButton v-else :to="link" v-bind="$attrs" :class="classes">
    <slot />
  </UButton>
</template>

<style lang="postcss" scoped>
button[disabled] {
  cursor: not-allowed;
  @apply text-black shadow-none relative brutal-translate;
}
</style>
