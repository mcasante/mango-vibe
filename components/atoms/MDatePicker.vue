<script lang="ts" setup>
import { ref } from 'vue';

const date = ref(new Date());
</script>

<template>
  <vue-date-picker v-model="date" inline auto-apply />
</template>

