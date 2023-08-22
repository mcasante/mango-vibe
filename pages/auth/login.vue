<script lang="ts" setup>
import type { FormError } from '@nuxthq/ui/dist/runtime/types'

definePageMeta({
  title: 'Login',
  description: 'Login to Mango Vibe',
  layout: 'auth',
})

const login = () => {
  navigateTo('/home')
}

const state = ref({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
  // Do something with state.value
}

</script>

<template>
  <div class="h-full flex flex-col pt-20">
    <div class="brutal max-w-sm mx-2 px-4 py-8 rounded-md">
      <UForm
        ref="form"
        :validate="validate"
        :state="state"
        @submit.prevent="submit"
        class="flex flex-col gap-4"
      >
        <UFormGroup size="xl" label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup size="xl" label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <MButton class="self-end" type="submit" size="xl" @click="login">Login</MButton>
      </UForm>
    </div>
  </div>
</template>

<style>

</style>
