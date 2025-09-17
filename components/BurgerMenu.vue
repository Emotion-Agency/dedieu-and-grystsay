<script lang="ts" setup>
import type { TransitionProps } from 'vue'
import { useMadeByStory } from '~/composables/stories/madeByStory'
import { gsap } from '~/libs/gsap'
import type { iMenuContent } from '~/types/menuTypes'

interface iProps {
  content: iMenuContent
}

defineProps<iProps>()

const { story: madeByStory } = await useMadeByStory()
const { isMenuOpened } = useAppState()

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value
}

const fromClipPath = 'inset(100% 0 0 0)'
const toClipPath = 'inset(0% 0 0 0)'

let enterTimeline: gsap.core.Timeline | null = null
let leaveTimeline: gsap.core.Timeline | null = null

const menuTransition: TransitionProps = {
  css: false,
  mode: 'out-in',
  onEnter(el, done) {
    const links = el.querySelectorAll('.navigation__link')
    const bottomItems = el.querySelectorAll('.burger-menu__bottom')
    enterTimeline = gsap.timeline({ onComplete: done })

    enterTimeline
      .fromTo(
        el,
        { clipPath: fromClipPath },
        { clipPath: toClipPath, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        links,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<+0.2'
      )
      .fromTo(
        bottomItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<+0.3'
      )
  },

  onLeave(el, done) {
    const links = el.querySelectorAll('.navigation__link')
    const bottomItems = el.querySelectorAll('.burger-menu__bottom')
    leaveTimeline = gsap.timeline({ onComplete: done })

    leaveTimeline
      .to(
        links,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.in',
        },
        0
      )
      .to(
        bottomItems,
        {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in',
        },
        '<+0.1'
      )
      .to(
        el,
        {
          clipPath: fromClipPath,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<+0.1'
      )
  },
}

watch(isMenuOpened, () => {
  if (isMenuOpened.value) {
    window.elenis.stop()
    return
  } else {
    window.elenis.start()
  }
})
</script>

<template>
  <div class="burger-menu">
    <button
      type="button"
      class="burger-menu__btn"
      :class="{ 'burger-menu__btn--opened': isMenuOpened }"
      :aria-expanded="isMenuOpened"
      aria-label="Toggle menu"
      @click="toggleMenu"
    >
      <div class="burger-menu__lines">
        <span />
        <span />
        <span />
      </div>
      <div class="burger-menu__x">
        <span />
        <span />
      </div>
    </button>

    <Teleport to="#teleports">
      <Transition v-bind="menuTransition">
        <div
          v-if="isMenuOpened"
          class="burger-menu__content"
          :class="isMenuOpened && 'burger-menu__content--opened'"
        >
          <div class="burger-menu__inner">
            <div class="burger-menu__nav">
              <Navigation
                :links="content?.links"
                variant="menu"
                @close="toggleMenu"
              />
            </div>
            <LanguageSwitcher variant="menu" class="burger-menu__lang" />

            <div class="burger-menu__bottom">
              <MadeByText
                :content="madeByStory?.content"
                color="light"
                class="burger-menu__made-by"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.burger-menu {
  display: none;

  @media (max-width: $br1) {
    display: block;
  }
}

.burger-menu__btn {
  width: 34px;
  height: 34px;
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  mix-blend-mode: difference;
  color: white;
  z-index: 90;

  @media (min-width: $br1) {
    display: none;
  }

  @media (max-width: $br1) {
    right: $g-sm;
  }

  @media (max-width: $br3) {
    right: $g-s;
  }

  .burger-menu__lines {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 4.5px;
    width: 34px;

    span {
      height: 2px;
      background: currentColor;
      border-radius: 2px;
      transition: all 0.4s ease;

      &:nth-child(1) {
        width: 50%;
        margin-top: 0;
        transition-delay: 0.2s;
      }

      &:nth-child(2) {
        width: 100%;
        transition-delay: 0.3s;
      }

      &:nth-child(3) {
        width: 60%;
        transition-delay: 0.4s;
      }
    }
  }

  .burger-menu__x {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 100%;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    span {
      display: block;
      background: currentColor;
      transition: all 0.3s ease;

      &:nth-child(1) {
        height: 0%;
        width: 2px;
        position: absolute;
        top: 50%;
        left: 15px;
        transition-delay: 0s;
        transform: translateY(-50%);
      }

      &:nth-child(2) {
        width: 0%;
        height: 2px;
        position: absolute;
        top: 15px;
        left: 50%;
        transition-delay: 0.15s;
        transform: translateX(-50%);
      }
    }
  }

  &--opened {
    .burger-menu__lines span {
      &:nth-child(1) {
        width: 0%;
        transition-delay: 0s;
      }

      &:nth-child(2) {
        width: 0%;
        transition-delay: 0.05s;
      }

      &:nth-child(3) {
        width: 0%;
        transition-delay: 0.1s;
      }
    }

    .burger-menu__x {
      border-color: currentColor;
      transition-delay: 0.5s;

      span {
        &:nth-child(1) {
          height: 40%;
          transition-delay: 0.3s;
        }

        &:nth-child(2) {
          width: 40%;
          transition-delay: 0.2s;
        }
      }
    }
  }
}

.burger-menu__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100dvh;
  background: var(--foreground);
  overflow-y: auto;
  padding: 1rem;
}

.burger-menu__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.burger-menu__nav {
  @media (max-width: $br1) {
    padding-bottom: 7vh;
  }
}

.burger-menu__bottom {
  position: absolute;
  bottom: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12vh;
}

.burger-menu__lang {
  @media (max-width: $br1) {
    gap: 14px;
  }
}

.burger-menu__made-by {
  @media (max-width: $br1) {
    font-size: 18px !important;
  }
}
</style>
