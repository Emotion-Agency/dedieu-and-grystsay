<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iCurrentNews } from '~/types/projectsTypes'

interface IProps {
  projects: iCurrentNews[]
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

const tl = ref<GSAPTimeline>(null)

onMounted(() => {
  if ($el.value) {
    tl.value = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set($el.value, { opacity: 0, translateY: 50 })

    tl.value.to($el.value, {
      opacity: 1,
      translateY: 0,
      duration: 2,
      ease: 'power2.out',
    })
  }
})

onBeforeUnmount(() => {
  tl.value?.kill()
})
</script>

<template>
  <div ref="$el" class="curr-pr-mob">
    <ul class="curr-pr-mob__list">
      <li
        v-for="(project, idx) in projects"
        :key="idx"
        class="curr-pr-mob__item"
      >
        <div class="curr-pr-mob__item-content">
          <CustomImage
            :src="project.asset.filename"
            :alt="project.asset.alt"
            class="curr-pr-mob__img"
          />

          <div class="curr-pr-mob__info">
            <h3 class="curr-pr-mob__title">{{ project.title }}</h3>
            <p class="curr-pr-mob__text">{{ project.text }}</p>
            <p class="curr-pr-mob__number">
              {{ idx + 1 }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.curr-pr-mob__list {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.curr-pr-mob__item {
  width: 100%;
}

.curr-pr-mob__img {
  height: auto;
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 470px;
}

.curr-pr-mob__info {
  margin-top: 25px;
}

.curr-pr-mob__title {
  @include medium;
  font-size: 40px;
  line-height: 0.9em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  word-break: break-word;
}

.curr-pr-mob__text {
  @include regular;
  font-size: 16px;
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: 15px;
}

.curr-pr-mob__number {
  @include regular;
  font-size: 70px;
  line-height: 1em;
  margin-top: 30px;
}
</style>
