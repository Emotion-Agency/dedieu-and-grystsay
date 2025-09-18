<script setup lang="ts">
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface IProps {
  projects: iStory<iProjectsContent>[]
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
        <NuxtLink
          :to="'/' + project.full_slug"
          class="curr-pr-mob__item-content"
        >
          <CustomImage
            :src="project?.content?.preview?.filename"
            :alt="project?.content?.preview?.alt"
            :width="650"
            class="curr-pr-mob__img"
          />

          <div class="curr-pr-mob__info">
            <h3 class="curr-pr-mob__title">{{ findProjectTitle(project) }}</h3>
            <p class="curr-pr-mob__text">{{ project?.content?.description }}</p>
            <p class="curr-pr-mob__number">
              {{ idx + 1 }}
            </p>
          </div>
        </NuxtLink>
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
  font-size: 18px;
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

.curr-pr-mob__item-content {
  display: block;
}
</style>
