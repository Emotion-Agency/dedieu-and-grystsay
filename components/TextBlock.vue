<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'
import { gsap } from '~/libs/gsap'

interface IProps {
  content: iTextBlock
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

const size = props.content?.size?.toLowerCase()
const { path, params } = useRoute()

const isAboutPage = computed(() => path.includes('/about'))
const isCurrentNewsPage = computed(() => path.includes(`/news/${params?.id}`))

onMounted(() => {
  if ($el.value) {
    const $title = $el.value.querySelector('.text-block__title')
    const $line = $el.value.querySelector('.text-block__line')
    const $text = $el.value.querySelector('.text-block__text')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set($title, {
      opacity: 0,
      translateY: 50,
    })
    gsap.set($text, {
      opacity: 0,
      translateY: 50,
    })
    gsap.set($line, {
      width: 0,
    })

    tl.to($title, {
      opacity: 1,
      translateY: 0,
      duration: 1.8,
      ease: 'power2.out',
    })
    tl.to(
      $line,
      {
        width: '100%',
        duration: 2,
        ease: 'power2.out',
      },
      '<10%'
    )
    tl.to(
      $text,
      {
        opacity: 1,
        translateY: 0,
        duration: 2.2,
        ease: 'power2.out',
      },
      '<'
    )
  }
})
</script>

<template>
  <div ref="$el" class="text-block">
    <h2
      v-if="content?.title"
      class="text-block__title"
      :class="{
        'text-block__title--small': size === 'sm',
        'text-block__title--medium': size === 'md',
        'text-block__title--news': isCurrentNewsPage,
      }"
    >
      {{ content?.title }}
    </h2>
    <div
      v-if="(isAboutPage && content?.title) || isCurrentNewsPage"
      class="text-block__line"
      :class="{
        'text-block__line--news': isCurrentNewsPage,
        'text-block__line--about': isAboutPage,
      }"
    />
    <p class="text-block__text" v-html="content?.text" />
  </div>
</template>

<style scoped lang="scss">
.text-block {
  display: flex;
  flex-direction: column;
}

.text-block__title {
  @include medium;
  text-align: center;
  text-transform: uppercase;
  font-size: vw(65);
  line-height: 0.9em;
  letter-spacing: -0.01em;
  margin-bottom: vw(30);

  &--small {
    font-size: vw(65);
    line-height: 0.9em;
    letter-spacing: -0.01em;
  }

  &--medium {
    font-size: vw(120);
    line-height: 0.82em;
    letter-spacing: -0.02em;
  }

  @media (max-width: $br1) {
    text-align: left;
    font-size: 65px;
    margin-bottom: 30px;
  }

  &--news {
    @media (max-width: $br1) {
      text-align: center;
    }
  }
}

.text-block__line {
  display: block;
  width: vw(40);
  height: 1px;
  background-color: var(--foreground);
  margin: 0 auto;

  @media (max-width: $br1) {
    width: 38px;
    margin: 0 auto;
  }

  &--news {
    display: none;

    @media (max-width: $br1) {
      display: block;
    }
  }

  &--about {
    display: block;

    @media (max-width: $br1) {
      display: none;
    }
  }
}

.text-block__text {
  @include medium;
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}
</style>
