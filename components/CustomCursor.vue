<script lang="ts" setup>
import { useGlobalStory } from '~/composables/stories/globalStory'

interface Props {
  text?: string
}

const props = defineProps<Props>()

const { story } = await useGlobalStory()

const isIndicatorActive = ref(false)
const isIndicatorVisible = ref<boolean>(false)
const $cursorIndicator = useTemplateRef('cursorIndicator')
const $area = useTemplateRef('area')

const setIndicator = (event: MouseEvent) => {
  const x = event.clientX
  const y = event.clientY

  isIndicatorVisible.value = true
  $cursorIndicator.value.style.setProperty('--indicator-x', `${x}px`)
  $cursorIndicator.value.style.setProperty('--indicator-y', `${y}px`)
}

const hideIndicator = () => {
  isIndicatorVisible.value = false
}

useIntersectionObserver($area, entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      isIndicatorVisible.value = false
    }
  })
})

onMounted(() => {
  $area.value?.parentElement?.addEventListener('mousemove', setIndicator)
  $area.value?.parentElement?.addEventListener('mouseleave', hideIndicator)
})

onBeforeUnmount(() => {
  $area.value?.parentElement?.removeEventListener('mousemove', setIndicator)
  $area.value?.parentElement?.removeEventListener('mouseleave', hideIndicator)
})

const cursorText = computed(() => {
  return props.text || story.value?.content?.cursor
})
</script>

<template>
  <div ref="area" class="custom-cursor-area">
    <div
      ref="cursorIndicator"
      class="custom-cursor"
      :class="{
        active: isIndicatorActive,
        visible: isIndicatorVisible,
      }"
    >
      {{ cursorText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-cursor-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.custom-cursor {
  @include medium;
  position: fixed;
  z-index: 1000;
  width: vw(87);
  height: vw(87);
  top: calc(var(--indicator-y, 0px) - vw(43.5));
  left: calc(var(--indicator-x, 0px) - vw(43.5));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--dark);
  color: var(--background);
  font-size: vw(14);
  line-height: 1em;
  text-transform: capitalize;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.5);
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
  user-select: none;

  @media (max-width: $br1) {
    display: none;
  }

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &.active {
    transform: scale(0.8);
  }
}
</style>
