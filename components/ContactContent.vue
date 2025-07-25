<script lang="ts" setup>
import { useCompanyContactStory } from '~/composables/stories/companyContactStory'
import { useFooterStory } from '~/composables/stories/footerStory'
import { useMadeByStory } from '~/composables/stories/madeByStory'
import { useMenuStory } from '~/composables/stories/menuStory'

const { story: footerStory } = await useFooterStory()
const { story: companyContactStory } = await useCompanyContactStory()
const { story: menuStory } = await useMenuStory()
const { story: madeByStory } = await useMadeByStory()

const localePath = useLocalePath()
</script>

<template>
  <div class="contact-content">
    <div class="contact-content__about-block">
      <AppForm />
      <div class="contact-content__contacts">
        <a
          :href="companyContactStory?.content?.links[0]?.url?.cached_url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-content__inst"
        >
          <IconsInstagram />
          {{ companyContactStory?.content?.links[0]?.label }}
        </a>
        <a
          :href="`mailto:${companyContactStory?.content?.links[1]?.url?.cached_url}`"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-content__mail underline-reverse"
        >
          {{ companyContactStory?.content?.links[1]?.label }}
        </a>
        <p class="contact-content__text">
          {{ footerStory?.content?.text }}
        </p>
      </div>
    </div>
    <div class="contact-content__navigation-block">
      <div class="contact-content__line" />
      <div class="contact-content__navigation-content">
        <div class="contact-content__navigation-left">
          <NuxtLink
            :to="localePath('/')"
            aria-label="Site logo"
            class="contact-content__link"
          >
            <Logo color="light" />
          </NuxtLink>

          <Navigation
            :links="menuStory?.content?.links"
            variant="footer"
            class="contact-content__navigation"
          />
        </div>

        <MadeByText
          class="contact-content__navigation-info"
          :content="madeByStory?.content"
          color="light"
        />
      </div>
      <div class="contact-content__line" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-content__about-block {
  display: flex;
  align-items: flex-start;
  gap: vw(50);
  padding-top: vw(60);

  @media (max-width: $br1) {
    flex-direction: column;
    padding-top: 40px;
    gap: 85px;
  }
}

.contact-content__contacts {
  display: flex;
  flex-direction: column;
  gap: vw(50);

  @media (min-width: $br1) {
    max-width: vw(400);
  }

  @media (max-width: $br1) {
    max-width: 70%;
    gap: 24px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.contact-content__inst {
  @include medium;
  font-size: vw(16);
  display: flex;
  align-items: center;
  gap: vw(10);
  transition: color 0.3s ease;

  svg {
    display: block;
    width: vw(28);
    height: vw(28);

    @media (max-width: $br1) {
      width: 27px;
      height: 27px;
    }
  }

  &:hover {
    color: var(--primary);
  }

  @media (max-width: $br1) {
    gap: 10px;
    font-size: 16px;
  }
}

.contact-content__mail {
  @include medium;
  font-size: vw(16);
  position: relative;
  width: fit-content;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}

.contact-content__text {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;

  @media (max-width: $br1) {
    font-size: 16px;
    letter-spacing: -0.01em;
  }
}

.contact-content__navigation-block {
  margin-top: vw(140);

  @media (max-width: $br1) {
    margin-top: 46px;
  }
}

.contact-content__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--background);

  @media (min-width: $br1) {
    &:first-child {
      display: none;
    }

    &:last-child {
      display: block;
    }
  }

  @media (max-width: $br1) {
    &:first-child {
      display: block;
    }

    &:last-child {
      display: none;
    }
  }
}

.contact-content__navigation-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: vw(40);

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.contact-content__navigation-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: $br1) {
    max-width: vw(872);
  }
}

.contact-content__link {
  display: block;
  width: vw(188);
  height: vw(37);

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: $br1) {
    display: none;
  }
}

.contact-content__navigation-info {
  @media (max-width: $br1) {
    display: none;
  }
}
</style>
