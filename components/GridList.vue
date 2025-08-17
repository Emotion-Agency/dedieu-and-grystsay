<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iGridContent, iGridItems } from '~/types/gridTypes'
import type { iStory } from '~/types/story'

interface IProps {
  content: iGridContent
  items: iStory<iGridItems>[]
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 960)

const SHOW_LIMIT = 5
const showAll = ref(false)

const isButtonVisible = computed(
  () => !showAll.value && props.items.length > SHOW_LIMIT
)

const filteredItems = computed(() =>
  showAll.value ? props.items : props.items.slice(0, SHOW_LIMIT)
)

const onGetAll = () => (showAll.value = true)
</script>

<template>
  <div class="grid-list">
    <div class="grid-list__items">
      <NuxtLink
        v-for="(item, idx) in filteredItems"
        :key="idx"
        class="grid-list__item"
        :to="`/${item?.full_slug}`"
      >
        <div class="grid-list__img-wrapper">
          <CustomImage
            :src="item?.content?.body[2]?.assets[0]?.filename"
            :alt="item?.content?.body[2]?.assets[0]?.alt"
            class="grid-list__img"
          />
        </div>

        <div class="grid-list__content">
          <h3 class="grid-list__title">
            {{ item?.content?.title }}
          </h3>
          <p class="grid-list__description">
            {{ item?.content?.description }}
          </p>
          <TextButton class="grid-list__text-btn">
            {{ story?.content?.see_more }}
          </TextButton>
        </div>
      </NuxtLink>
    </div>
    <CircleButton
      v-if="isButtonVisible"
      v-show="!isMobile"
      direction="left"
      class="grid-list__circle-btn"
      @click="onGetAll"
    >
      {{ content?.button }}
    </CircleButton>
    <CircleButton
      v-if="isButtonVisible"
      v-show="isMobile"
      direction="right"
      class="grid-list__circle-btn"
      @click="onGetAll"
    >
      {{ content?.button }}
    </CircleButton>
  </div>
</template>

<style lang="scss">
.grid-list__items {
  position: relative;

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: vw(40);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    gap: 72px;
  }
}

.grid-list__item {
  height: fit-content;

  @media (min-width: $br1) {
    &:nth-child(5n + 1) {
      @include col(1, 6);

      .grid-list__img-wrapper {
        height: vw(431);
      }

      .grid-list__description {
        max-width: 80%;
      }
    }

    &:nth-child(5n + 2) {
      @include col(9, 12);

      .grid-list__img-wrapper {
        height: vw(567);
      }
    }

    &:nth-child(5n + 3) {
      @include col(1, 7);
      margin-top: vw(158);
      display: flex;
      gap: vw(38);

      .grid-list__img-wrapper {
        width: vw(364);
        height: vw(454);
      }

      .grid-list__content {
        margin-top: 0;
      }

      .grid-list__description {
        max-width: 80%;
      }
    }

    &:nth-child(5n + 4) {
      @include col(9, 12);
      margin-top: vw(571);

      .grid-list__img-wrapper {
        height: vw(493);
      }
    }

    &:nth-child(5n + 5) {
      @include col(1, 6);
      margin-top: vw(-88);
      margin-bottom: vw(88);

      .grid-list__img-wrapper {
        height: vw(392);
      }

      .grid-list__description {
        max-width: 80%;
      }
    }
  }

  &:hover {
    .grid-list__img {
      transform: scale(1);
    }

    .grid-list__text-btn {
      span::before {
        width: 100%;
      }

      svg {
        transform: scale(0.8);
      }
    }
  }
}

.grid-list__content {
  margin-top: vw(20);

  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.grid-list__img-wrapper {
  display: block;
  flex: 1 0 auto;
  overflow: hidden;
  width: 100%;
}

.grid-list__img {
  display: block;
  height: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;

  @media (max-width: $br1) {
    height: 470px;
  }
}

.grid-list__title {
  @include medium;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1.08em;
  font-size: vw(50);
  word-break: break-word;

  @media (max-width: $br1) {
    letter-spacing: -0.02em;
    font-size: 40px;
  }
}

.grid-list__description {
  @include regular;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: vw(15);

  @media (max-width: $br1) {
    font-size: 18px;
    margin-top: 15px;
  }
}

.grid-list__text-btn {
  color: inherit;
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}

.grid-list__circle-btn {
  @media (min-width: $br1) {
    margin-left: auto;
    margin-right: vw(50);
  }

  @media (max-width: $br1) {
    margin-left: 50px;
    margin-top: 50px;
  }
}
</style>
