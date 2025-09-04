<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

const props = defineProps<IProps>()

const isExpanded = ref(false)
const $el = ref<HTMLElement | null>(null)

const displayedText = computed(() =>
  isExpanded.value
    ? props.content.text
    : truncateString(props.content.text, 135)
)

const toggleText = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  if ($el.value) {
    const $title = $el.value.querySelector('.pr-text-block__title')
    const $text = $el.value.querySelector('.pr-text-block__text')

    const textSplit = new SplitText($text, {
      type: 'lines',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set($title, {
      opacity: 0,
      translateY: 20,
    })
    gsap.set(textSplit.lines, {
      opacity: 0,
      translateY: 20,
    })

    tl.to(
      $title,
      {
        opacity: 1,
        translateY: 0,
        duration: 1.8,
        ease: 'power2.out',
      },
      '<'
    )
    tl.to(
      textSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'expo.out',
        stagger: 0.1,
      },
      '<20%'
    )
  }
})
</script>

<template>
  <section ref="$el" class="pr-text-block container">
    <div class="pr-text-block__wrapper">
      <div class="pr-text-block__info">
        <h3 class="pr-text-block__title">
          {{ content?.title }}
        </h3>
        <div class="pr-text-block__text">
          <span>{{ displayedText }}</span>
          <button
            type="button"
            class="pr-text-block__btn underline-reverse"
            @click="toggleText"
          >
            {{ isExpanded ? 'less' : 'more' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.pr-text-block {
  padding-top: vw(60);
  padding-bottom: vw(40);

  @media (max-width: $br1) {
    padding-top: 20px;
    padding-bottom: 0;
  }
}

.pr-text-block__info {
  display: flex;
  align-items: flex-start;

  @media (min-width: $br1) {
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.pr-text-block__title {
  @include medium;
  font-size: vw(40);
  line-height: 1.4em;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (min-width: $br1) {
    line-height: 1em;
  }

  @media (max-width: $br1) {
    font-size: 34px;
  }
}

.pr-text-block__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  display: inline-block;

  @media (min-width: $br1) {
    max-width: vw(880);
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
    margin-top: 15px;
  }
}

.pr-text-block__btn {
  @include semibold;
  display: inline-block;
  background-color: transparent;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  position: relative;
  text-transform: lowercase;

  @media (max-width: $br1) {
    @include regular;
    font-size: 16px;
  }

  &::before {
    bottom: vw(2);

    @media (max-width: $br1) {
      bottom: 2px;
    }
  }
}
</style>
