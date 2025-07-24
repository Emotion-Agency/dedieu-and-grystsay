<script setup lang="ts">
import type { iCurrentProject } from '~/types/projectsTypes'

interface IProps {
  projects: iCurrentProject[]
}

defineProps<IProps>()
</script>

<template>
  <div class="curr-pr-mob">
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
.curr-pr-mob {
  padding-top: 40px;
}

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
  height: 442px;
}

.curr-pr-mob__info {
  margin-top: 25px;
}

.curr-pr-mob__title {
  @include semibold;
  font-size: 36px;
  line-height: 0.9em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  word-break: break-word;
}

.curr-pr-mob__text {
  @include regular;
  font-size: 16px;
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: 25px;
}

.curr-pr-mob__number {
  @include regular;
  font-size: 100px;
  line-height: 1em;
  margin-top: 25px;
}
</style>
