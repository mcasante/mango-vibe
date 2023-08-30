<script lang="ts" setup>
import mealsJson from '~/mock/meals.json'

interface Meal {
  id: number
  timestamp: number
  photo: string
  name: string
  notes?: string
  tags?: string[]
}

interface MealForm {
  name: string
  photo: string | ArrayBuffer | null
  timestamp: number
}

const route = useRoute()
const picture = useState<string | ArrayBuffer | null>('picture')

const loadMealData = async (id: string): Promise<Meal | undefined> => new Promise((resolve) => {
  setTimeout(() => {
    const meals = mealsJson
    const found = meals.find(m => m.id === Number(id))
    resolve(found)
  }, 1000)
})

const mealData = await (async () => {
  if (!route.params?.id)
    return
  return await loadMealData(route.params.id as string)
})()

const mealForm = reactive<MealForm>({
  name: mealData?.name || '',
  photo: mealData?.photo || null,
  timestamp: mealData?.timestamp || Date.now(),
})

const image = computed(() => mealForm.photo || picture.value || null)

const handleFile = (buffer: string | ArrayBuffer | null) => {
  mealForm.photo = buffer
  picture.value = buffer
}

const resetImage = () => {
  mealForm.photo = null
  picture.value = null
}
</script>

<template>
  <div class="relative flex flex-col h-full bg-mango-pink-50">
    <MTransitionExpand name="blur">
      <div v-if="image" class="relative pr-2">
        <image-resizer :image-src="image" class="px-4 py-4" @update:image-src="resetImage" />
      </div>
      <div v-else class="flex justify-center items-center px-4 py-4">
        <MCaptureImage class="max-w-min" @capture="handleFile" />
      </div>
    </MTransitionExpand>
    <div class="info overflow-y-scroll rounded-t-7 flex-grow w-full max-w-192 mx-auto bg-white border-t-[3px] border-black px-4 py-4">
      <EditMeal v-model:model="mealForm" class="mb-4" />
      <div class="flex items-center justify-between rounded px-3 pb-2 pt-1 border-4 border-black bg-amber-300 w-full">
        <span class="text-5 font-bold">
          Done?
        </span>
        <div class="flex gap-1 justify-end w-full items-center">
          <UButton class="bg-gray-200! text-gray-700! rounded font-bold">
            nah, drop
          </UButton> <span class="text-8 inline-block ml-.5">|</span>
          <UButton class="bg-pink-500! hover:shadow-black! text-white! rounded font-bold">
            Yessir, save!
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>