<script lang="ts" setup>
import { useClamp } from '@vueuse/math'

const props = defineProps<{
  imageSrc: any
}>()
const emit = defineEmits<{
  (e: 'update:imageSrc', imageSrc: string | ArrayBuffer | null): void
}>()

const activeColor = ref('#f9a8d4')

const canvas = ref()
const image = ref()
const container = ref()
const { width } = useElementSize(container)

const moved = useClamp(0, 0, 100)

const model = reactive({
  scale: 1,
  slider: 1,
})

const size = reactive<{ [key: string]: number }>({
  x: 0,
  y: 0,
})

let ctx: CanvasRenderingContext2D

const ar = computed(() => {
  if (!image?.value?.src)
    return [0, 0]
  const { width, height } = image.value
  const aspectRatio = width / height
  const newWidth = width * aspectRatio
  const newHeight = height * aspectRatio
  return [newWidth, newHeight]
})

const map: { [key: number]: any } = {
  0: (x: number) => {
    size.x = canvas.value.width
    size.y = size.x / x * ar.value[1]
  },
  1: (y: number) => {
    size.y = canvas.value.height
    size.x = size.y / y * ar.value[0]
  },
}

const drawImage = (scale: number) => {
  ctx.save()
  const [full, half] = new Array(2).fill(canvas.value.width).map((n, i) => n / (i + 1))
  const [x, y, w, h] = new Array(2).fill(['x', 'y'])
    .map((entry, i) => (
      entry
        .map((n: keyof typeof size) => size[n] * scale)
        .map((n: number) => i ? n : -n / 2)
    )).flat()

  ctx.fillStyle = activeColor.value
  ctx.translate(half, half)
  ctx.fillRect(-half, -half, full, full)

  ctx.drawImage(
    image.value,
    0, 0,
    image.value.width,
    image.value.height,
    x, y, w, h,
  )
  ctx.restore()
}

const updateScale = (value: number) => {
  const minScale = 1
  const maxScale = 2
  const sliderPercentage = value / 100
  const scaleRange = maxScale - minScale
  const newScale = minScale + sliderPercentage * scaleRange
  model.scale = newScale
  drawImage(model.scale)
}

watch(moved, (value: number) => updateScale(value))

watchEffect(async () => {
  if (!canvas.value)
    return
  canvas.value.width = width.value
  canvas.value.height = width.value
  await setup()
  drawImage(model.scale)
})

watchEffect(() => {
  if (ctx)
    updateScale(model.slider)
})

watch(activeColor, () => {
  if (ctx)
    drawImage(model.scale)
})

function setup(): Promise<void> {
  ctx = canvas.value.getContext('2d')
  return new Promise((resolve, reject) => {
    if (!Image)
      reject(new Error('Image is not defined'))

    image.value = new Image()
    image.value.src = props.imageSrc
    image.value.addEventListener('load', () => {
      const max = Math.max(...ar.value)

      const greater: keyof typeof map = ar.value.findIndex(v => v === max)
      map[greater](max)
      resolve()
    })
  })
}

const colors = [
  '#f9a8d4',
  'rgba(190,242,100,1)',
  'rgba(252,211,77,1)',
  '#FFF',
  '#000',
]
const updateColor = (color: string) => {
  activeColor.value = color
}
</script>

<template>
  <div ref="container" class="pinch-zoom-canvas pt-0">
    <div class="mt-4 flex flex-col gap-3 mr-4 h-full justify-between">
      <MButton class="!bg-red-500 mb-10 w-8 h-8 text-white font-bold z-99 !p-1" @click="emit('update:imageSrc', null)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </MButton>
      <m-button
        v-for="color in colors"
        :key="color"
        class="w-8 h-8 rounded brutal"
        :class="{
          'brutal-translate! shadow-none!': activeColor === color,
        }"
        :style="{ backgroundColor: color }"
        @click="() => updateColor(color)"
      />
    </div>
    <div class="max-w-90 flex flex-col items-stretch gap-4">
      <div class="relative rounded-lg p-2 mt-4 bg-white brutal">
        <canvas ref="canvas" class="b-1 b-black rounded-lg w-full" />
      </div>
      <div class="dark">
        <URange size="lg" color="lime" :min="0" :max="100" v-model="moved" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pinch-zoom-canvas {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
