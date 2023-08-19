<script setup lang="ts">
import mealsJson from '~/mock/meals.json'
import MButton from '~/components/atoms/MButton.vue'

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
const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }))
const picture = useState<string | ArrayBuffer | null>('picture', () => null)

const getTime = (timestamp: number): string => new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
const mapMeal = (meal: Meal) => ({
  ...meal,
  photo: 'https://picsum.photos/250/250',
  time: getTime(meal.timestamp),
})

const meals = ref((await remoteLoadMeals()).map(mapMeal))
const mealItems = computed(() => [...(meals.value || []), { add: true }])

const currentIndex = ref(mealItems.value.length - 1)
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

const CarouselControls = () => h('div',
  { class: 'flex justify-center' },
  [
    h(MButton, {
      disabled: currentIndex.value <= 0,
      class: 'rounded-l',
      onClick: () => currentIndex.value--,
    }, () => h('div', { class: 'i-heroicons-arrow-left' })),
    h(MButton, {
      disabled: currentIndex.value >= mealItems.value.length - 1,
      class: 'rounded-r',
      onClick: () => currentIndex.value++,
    }, () => h('div', { class: 'i-heroicons-arrow-right' })),
  ])

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
      <MealData v-if="currentMeal" :meal="currentMeal" @remove-tag="handleRemove">
        <template #controls>
          <CarouselControls class="mt-2" />
        </template>
      </MealData>
      <template v-else>
        <div class="h-full flex justify-center">
          <UPopover :popper="{ placement: 'auto' }">
            <UButton size="xl" icon="i-heroicons-calendar-days-20-solid" :label="label" />
            <template #panel="{ close }">
              <vue-date-picker v-model="date" @update:model-value="close" inline auto-apply />
            </template>
          </UPopover>
        </div>
      </template>
    </div>
  </section>
</template>

<style>

</style>
