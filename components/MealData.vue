<script setup lang="ts">
const props = defineProps<{
  meal?: any
}>()

// define emits
const emit = defineEmits<{
  (e: 'removeTag', mealId: any, tag: string): void
}>()

const {
  isRevealed,
  reveal,
  confirm,
  cancel,
  onCancel,
  onConfirm,
} = useConfirmDialog()

const { textarea, input: notes } = useTextareaAutosize()
const { focused } = useFocus(textarea)

let lastNote = ''
watch(focused, (hasFocus) => {
  if (hasFocus) {
    lastNote = notes.value
    return
  }

  if (lastNote !== notes.value)
    reveal()
})

onConfirm(() => {
  console.log('confirmed')
})

onCancel(() => {
  notes.value = lastNote
})

const addTagModal = reactive({
  visible: false,
})

watchEffect(() => {
  if (!props.meal)
    return

  notes.value = props.meal.notes || ''
})

const addTag = () => {
  addTagModal.visible = true
}

// handleRemove
const handleRemove = (mealId: string, tag: string) => {
  emit('removeTag', mealId, tag)
}
const today = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
</script>

<template>
  <div class="meal-data">
    <div class="flex justify-between gap-2 items-start">
      <div>
        <h2 class="font-itim font-bold text-2xl text-mango-green text-border-[2px] text-border-black">
          {{ meal ? meal.name : 'Overview' }}
        </h2>
        <small class="time">
          {{ meal ? meal.time : today }}
        </small>
      </div>
      <slot name="controls" />
    </div>

    <m-transition-expand>
      <div v-if="meal">
        <div class="flex flex-wrap gap-2 mt-2">
          <MTag
            v-for="tag in meal.tags"
            :key="tag" removable
            @remove="() => meal && handleRemove(meal.id, tag)"
          >
            {{ tag }}
          </MTag>
          <MTag class="cursor-pointer" @click="addTag">
            +
          </MTag>
        </div>

        <div
          :class="{ 'border-solid brutal brutal--translate bg-white!': focused }"
          class="mt-6 brutal-translate py-2 px-4 rounded-lg transition border-black border-[3px] border-dashed bg-white/90"
        >
          <label for="notes">
            <h4 class="text-6 mb-2">
              Notes
            </h4>
          </label>
          <textarea id="notes" ref="textarea" v-model="notes" name="notes" rows="5" class="bg-transparent outline-none w-full h-full resize-none" />
        </div>
      </div>
    </m-transition-expand>
  </div>
  <m-modal v-if="meal" v-model:visible="addTagModal.visible">
    <h1 class="text-2xl font-bold mb-4">
      Get started
    </h1>

    <edit-tags :selected="meal.tags || []" />
  </m-modal>
  <m-modal v-model:visible="isRevealed" class="max-w-90" :closable="false">
    <h1 class="flex gap-2 items-center text-2xl font-bold mb-4">
      <span class="inline-block i-carbon-warning-square-filled" />
      Update note
    </h1>
    <p>
      Are you sure you want to update your note?
    </p>
    <hr class="border border-black my-4">
    <div class="flex justify-end gap-2">
      <MButton class="bg-gray-200! text-gray-700! rounded font-bold" @click="cancel">
        Cancel
      </MButton>
      <MButton class="bg-pink-500! hover:shadow-black! text-white rounded font-bold" @click="confirm">
        Confirm
      </MButton>
    </div>
  </m-modal>
</template>

<style lang="postcss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
