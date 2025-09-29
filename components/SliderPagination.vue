<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'

interface iProps {
  itemsCount: number
  currentIndex: number
}

const props = defineProps<iProps>()

const emit = defineEmits(['next'])

const { story } = useGlobalStory()
const squares = new Array(props.itemsCount)
</script>

<template>
  <div class="slider-pag">
    <div class="slider-pag__squares">
      <div
        v-for="(_, idx) in squares"
        :key="idx"
        class="slider-pag__square"
        :class="{ 'slider-pag__square--active': currentIndex === idx }"
      />
    </div>
    <TextButton
      class="slider-pag__btn"
      aria-label="next slide"
      @click="emit('next')"
    >
      {{ story?.content?.slides_next }}
    </TextButton>
  </div>
</template>

<style scoped lang="scss">
.slider-pag {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: vw(16);
  margin-top: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
    margin-top: 30px;
  }
}

.slider-pag__squares {
  display: flex;
  align-items: center;
  gap: vw(8);

  @media (max-width: $br1) {
    gap: 8px;
  }
}

.slider-pag__square {
  display: block;
  width: vw(10);
  height: vw(10);
  background-color: transparent;
  border: 1px solid var(--foreground);
  transition: background-color 0.3s ease;

  @media (max-width: $br1) {
    width: 10px;
    height: 10px;
  }

  &--active {
    background-color: var(--foreground);
  }
}
</style>
