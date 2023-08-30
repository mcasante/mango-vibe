<script lang="ts" setup>
import type { FormError } from '@nuxthq/ui/dist/runtime/types'

definePageMeta({
  title: 'Sign Up',
  description: 'Sign up to Mango Vibe',
  layout: 'auth',
})

const authProviders = [
  {
    name: 'Continue with Google',
    icon: 'i-logos-google-icon',
    id: 'google',
  },
]

const state = ref({
  name: undefined,
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
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
  <div class="flex flex-col h-full items-center justify-center">
    <section class="flex-grow gap-2 w-full flex flex-col items-center px-8">
      <div class="flex flex-col justify-center mt-12 mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Sign Up
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Sign up to <b class="text-mango-pink-100">Mango Vibe</b>
        </p>
      </div>

      <UForm
        ref="form"
        :validate="validate"
        :state="state"
        @submit.prevent="submit"
        class="flex w-full max-w-sm flex-col gap-4 pb-8"
      >
        <UFormGroup required size="lg" label="Name" name="name">
          <UInput 
          v-model="state.name" 
          placeholder="Your name or nickname"
          icon="i-heroicons-user-circle"
          />
        </UFormGroup>
        
        <UFormGroup required size="lg" label="Email" name="email">
          <UInput 
            v-model="state.email" 
            placeholder="Your email"
            icon="i-heroicons-identification"
          />
        </UFormGroup>

        <UFormGroup required size="lg" label="Password" name="password">
          <UInput 
            v-model="state.password" 
            placeholder="Your password"
            icon="i-heroicons-key"
            type="password"
          />
        </UFormGroup>

        <UButton disabled class="cursor-not-allowed" block size="lg" @click="submit">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
          Sign Up
        </UButton>
      </UForm>

      <div class="text-xl relative font-bold block w-full max-w-sm text-center border-t-[2px] border-dashed border-black">
        <div class="inline-block bg-white px-2 translate-y-[-1em]">
          OR
        </div>
      </div>

      <UButton
        v-for="provider in authProviders" :key="provider.name"
        size="lg"
        color="white" variant="solid"
        class="w-full max-w-sm py-[13px]"
        :icon="provider.icon"
        :label="provider.name"
      />
    </section>
    
    <footer class="bg-cool-100 w-full px-4 py-8 text-center">
      <ULink to="/auth/signin" class="text-sm text-gray-600 dark:text-gray-400 hover:underline">
        Already have an account? <span class="font-bold underline text-mango-pink-100">Sign In</span>
      </ULink>
    </footer>
  </div>
</template>

<style>

</style>
