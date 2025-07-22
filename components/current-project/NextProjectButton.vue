<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  project: iStory<iProjectsContent>
}

defineProps<iProps>()

const { story } = await useGlobalStory()
</script>

<template>
  <NuxtLink :to="project?.slug" class="next-btn">
    <CustomImage
      :src="project?.content?.body[2]?.assets[0]?.filename"
      :alt="project?.content?.body[2]?.assets[0]?.alt"
      class="next-btn__img"
    />
    <div class="next-btn__content">
      <p class="next-btn__text">{{ story?.content?.next_project }}</p>
      <div class="next-btn__name-wrapper">
        <span class="next-btn__name">{{ project?.name }}</span>
        <span class="next-btn__arrow"><IconsBoldRightArrow /></span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.next-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: vw(1221);
  min-height: vw(289);
  width: 100%;
  margin: 0 auto;
  margin-top: vw(100);

  @media (max-width: $br1) {
    max-width: 100%;
    min-height: 498px;
    margin-top: 100px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: vw(400);
    z-index: 1;

    @media (max-width: $br1) {
      border-radius: 154px;
    }
  }
}

.next-btn__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: vw(400);
  z-index: 0;

  @media (max-width: $br1) {
    border-radius: 154px;
  }
}

.next-btn__content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: vw(30) vw(150);
  color: var(--background);
  overflow: hidden;

  @media (max-width: $br1) {
    padding: 50px 15px;
    justify-content: space-between;
    gap: 70px;
  }
}

.next-btn__text {
  @include medium;
  font-size: vw(30);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(30, 18);
    line-height: 1em;
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}

.next-btn__name-wrapper {
  display: flex;
  align-items: center;
  gap: vw(30);

  @media (max-width: $br1) {
    flex-direction: column;
    gap: 70px;
  }
}

.next-btn__name {
  @include medium;
  font-size: vw(100);
  line-height: 1em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  word-break: break-word;
  flex: 0 1 auto;

  @media (max-width: $br1) {
    font-size: size(100, 60);
    line-height: 0.9em;
    letter-spacing: -0.01em;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}

.next-btn__arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  width: vw(42);
  height: vw(42);
  border-radius: 100%;
  flex: 1 0 auto;

  svg {
    display: block;
    width: vw(14);
    height: vw(9);

    @media (max-width: $br1) {
      width: 14px;
      height: 8px;
    }
  }

  @media (max-width: $br1) {
    width: 45px;
    height: 45px;
  }
}
</style>
