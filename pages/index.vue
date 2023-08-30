<script setup lang="ts">
import mealsJson from '~/mock/meals.json'
import { useClamp } from '@vueuse/math'

export interface Meal {
  id: number
  timestamp: number
  photo: string
  name: string
  notes?: string
  tags?: string[]
}

function remoteLoadMeals(): Promise<Meal[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meals = mealsJson
      resolve(meals)
    }, 1000)
  })
}

const date = ref(new Date());
const picture = useState<string | ArrayBuffer | null>('picture', () => null)

const getTime = (timestamp: number): string => new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
const mapMeal = (meal: Meal) => ({
  ...meal,
  photo: 'https://picsum.photos/250/250',
  time: getTime(meal.timestamp),
})

const meals = ref((await remoteLoadMeals()).map(mapMeal))
const mealItems = computed(() => [...(meals.value || []), { add: true }])

const currentIndex = useClamp(mealItems.value.length - 1, 0, mealItems.value.length - 1)
const currentMeal = computed(() => meals.value?.[currentIndex.value])

const handleRemove = (mealId: Meal['id'], tag: string): void => {
  const found = meals.value?.find(m => m.id === mealId)
  if (found)
    found.tags = found.tags?.filter(t => t !== tag)
}

const handleFile = (buffer: string | ArrayBuffer | null) => {
  picture.value = buffer
  navigateTo('/meal/')
}

// random css transform tilt
const randomTilt = () => `rotate(${Math.random() * 10 - 5}deg)`

const overlay = reactive({ visible: false })

const { start } = useTimeoutFn(() => {
  overlay.visible = false
}, 1000)

const showOverlay = () => {
  overlay.visible = true
  start()
}

const updateCarousel = (item: any) => {
  if (item === mealItems.value[currentIndex.value]) {
    showOverlay()
    return
  }

  if (!mealItems.value.includes(item))
    return
  currentIndex.value = mealItems.value.findIndex(i => i === item)
}

</script>

<template>
  <section class="flex flex-col h-full">
    <div>
      <MCarousel
        v-model:active.sync="currentIndex"
        class="bg-repeat bg-mango-amber-100" :max-width="250" :items="mealItems"
        >
        <template #default="{ item, isSwiping, index }">
          <MCaptureImage v-if="item.add" @capture="handleFile" />
          <div v-else :style="{ transform: isSwiping ? 'none' : randomTilt() }" class="relative transition duration-[250] border-[3px] p-2 pb-1 bg-white rounded-lg h-full overflow-hidden border-black" @click="updateCarousel(item)">
            <img :src="item.photo" class="block rounded-lg">
            <span v-show="overlay.visible && currentIndex === index">
              <ULink :to="{ path: `/meal/${item.id}` }">
                <div
                  :class="{ '!bg-white/90': overlay.visible }"
                  class="overlay transition absolute top-0 w-full h-full left-0 flex justify-center items-center bg-white/0">
                  <UIcon class="text-gray-900 text-6xl inline-block" name="i-heroicons-pencil-square" />
                </div>
              </ULink>
            </span>
            <div class=" text-black text-right font-bold" v-text="item.time" />
          </div>
        </template>
      </MCarousel>
    </div>
    <div class="info rounded-t-7 grow w-full max-w-192 mx-auto bg-white border-t-[3px] border-black px-4 py-4">
      <MealData :meal="currentMeal" @remove-tag="handleRemove">
        <template #controls>
          <div class="flex justify-center mt-2">
            <UButton
              class="rounded-l"
              icon="i-heroicons-arrow-left"
              @click="() => currentIndex--"
              :disabled="currentIndex <= 0"
            />
            <UButton
              class="rounded-r"
              icon="i-heroicons-arrow-right"
              @click="() => currentIndex++"
              :disabled="currentIndex >= mealItems.length - 1"
            />
          </div>
        </template>
      </MealData>
      <MTransitionExpand name="blur">
        <div v-if="!currentMeal" class="mt-4 h-full flex justify-center">
          <vue-date-picker 
            v-model="date"
            :enable-time-picker="false"
            :max-date="new Date()"
            inline
            auto-apply
            prevent-min-max-navigation
            ignore-time-validation
          />
        </div>
      </MTransitionExpand>
    </div>
  </section>
</template>

<style>

</style>
