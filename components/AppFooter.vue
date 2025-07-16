<script lang="ts" setup>
import { useCompanyContactStory } from '~/composables/stories/companyContactStory'
import { useFooterStory } from '~/composables/stories/footerStory'
import { useFormStory } from '~/composables/stories/formStory'
import { useMadeByStory } from '~/composables/stories/madeByStory'
import { useMenuStory } from '~/composables/stories/menuStory'

const { story: footerStory } = await useFooterStory()
const { story: formStory } = await useFormStory()
const { story: companyContactStory } = await useCompanyContactStory()
const { story: menuStory } = await useMenuStory()
const { story: madeByStory } = await useMadeByStory()

const localePath = useLocalePath()

const titleParts = computed(() => {
  const title = footerStory.value?.content?.title || ''
  const [first = '', ...rest] = title.split(' ')

  return {
    first,
    rest: rest.join(' '),
  }
})
</script>

<template>
  <footer class="footer">
    <h2 class="footer__title footer__title--first">
      {{ titleParts.first }}
    </h2>
    <div class="footer__main-wrapper">
      <div class="footer__wrapper container">
        <h2 class="footer__title">
          {{ titleParts.rest }}
        </h2>
        <div class="foooter__about-block">
          <form class="footer__form">
            <div class="footer__inputs">
              <InputField
                :placeholder="formStory?.content?.name_field"
                name="Form name"
                type="text"
                :required="true"
                class="footer__input"
              />
              <InputField
                :placeholder="formStory?.content?.email_field"
                type="email"
                name="Form email"
                :required="true"
                class="footer__input"
              />
              <InputTextarea
                name="Form message"
                :placeholder="formStory.content.message_field"
                class="footer__textarea"
              />
            </div>

            <button type="submit" class="footer__form-btn">
              {{ formStory?.content?.submit_button }}
            </button>
          </form>
          <div class="footer__contacts">
            <a
              :href="companyContactStory?.content?.links[0]?.url?.cached_url"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__inst"
            >
              <IconsInstagram />
              {{ companyContactStory?.content?.links[0]?.label }}
            </a>
            <a
              :href="`mailto:${companyContactStory?.content?.links[1]?.url?.cached_url}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__mail underline-reverse"
            >
              {{ companyContactStory?.content?.links[1]?.label }}
            </a>
            <p class="footer__text">
              {{ footerStory?.content?.text }}
            </p>
          </div>
        </div>
        <div class="footer__navigation-block">
          <div class="footer__line" />
          <div class="footer__navigation-content">
            <div class="footer__navigation-left">
              <NuxtLink
                :to="localePath('/')"
                aria-label="Site logo"
                class="footer__link"
              >
                <Logo color="light" />
              </NuxtLink>

              <Navigation
                :links="menuStory?.content?.links"
                variant="footer"
                class="footer__navigation"
              />
            </div>

            <MadeByText
              class="footer__navigation-info"
              :content="madeByStory?.content"
              color="light"
            />
          </div>
          <div class="footer__line" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: var(--background);
  padding-top: vw(100);

  @media (max-width: $br1) {
    padding-top: 100px;
  }
}

.footer__wrapper {
  background-color: var(--foreground);

  padding-bottom: vw(40);

  @media (max-width: $br1) {
    padding-bottom: 20px;
  }
}

.footer__title {
  @include medium;
  font-size: vw(120);
  line-height: 0.96em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  word-break: break-word;

  @media (max-width: $br1) {
    font-size: 60px;
    line-height: 0.93em;
    letter-spacing: -0.03em;
  }

  &--first {
    color: var(--foreground);
    top: vw(12);

    @media (max-width: $br1) {
      top: 8px;
    }
  }
}

.foooter__about-block {
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

.footer__form {
  width: 100%;
}

.footer__inputs {
  display: flex;
  flex-direction: column;
  gap: vw(20);
  width: 100%;

  @media (max-width: $br1) {
    gap: 20px;
  }
}

.footer__form-btn {
  @include regular;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: vw(28);
  padding: vw(15) vw(45);
  border-radius: vw(100);
  font-size: vw(16);
  letter-spacing: -0.03em;
  line-height: 1.3em;
  text-transform: capitalize;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--foreground-muted);
  }

  @media (max-width: $br1) {
    margin-top: 40px;
    font-size: 16px;
    padding: 13px 42px;
    border-radius: 100px;
  }
}

.footer__contacts {
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

.footer__inst {
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

.footer__mail {
  @include medium;
  font-size: vw(16);
  position: relative;
  width: fit-content;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}

.footer__text {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;

  @media (max-width: $br1) {
    font-size: 16px;
    letter-spacing: -0.01em;
  }
}

.footer__navigation-block {
  margin-top: vw(140);

  @media (max-width: $br1) {
    margin-top: 46px;
  }
}

.footer__line {
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

.footer__navigation-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: vw(40);

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.footer__navigation-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: $br1) {
    max-width: vw(872);
  }
}

.footer__link {
  display: block;
  width: vw(188);
  height: vw(37);

  @media (max-width: $br1) {
    display: none;
  }
}

.footer__navigation-info {
  @media (max-width: $br1) {
    display: none;
  }
}
</style>
