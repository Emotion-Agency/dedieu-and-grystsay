<script lang="ts" setup>
import { useFormStory } from '~/composables/stories/formStory'
import type { IForm } from '~/types/form'

const { story } = await useFormStory()
const { showThankYou } = useThankyouScreen()

const model = defineModel<IForm>()

const inputs = reactiveComputed(() => [
  {
    id: `form-name`,
    name: 'name',
    type: 'text',
    placeholder: story?.value?.content?.name_field || 'name',
    required: true,
    value: model.value?.name.value,
    error: model.value?.name?.error,
    validators: [Validation.min(2, 'Please enter at least 2 characters')],
  },
  {
    id: `form-email`,
    name: 'email',
    type: 'email',
    placeholder: story?.value?.content?.email_field || 'email',
    required: true,
    value: model.value?.email.value,
    error: model.value?.email?.error,
    validators: [Validation.email('Please enter a valid email address')],
  },
  {
    id: `form-message`,
    name: 'message',
    type: 'textarea',
    placeholder: story?.value?.content?.message_field || 'tape ton message',
    required: true,
    value: model.value?.message.value,
    error: model.value?.message?.error,
    validators: [Validation.min(4, 'Please enter at least 4 characters')],
  },
])

const isFormValid = computed(() => {
  if (!model.value) return false

  return Object.values(model.value).every(field => {
    return !!field.value?.trim() && !field.error
  })
})

const onSubmit = e => {
  e.preventDefault()
  showThankYou()
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="onSubmit">
    <div class="form__inputs">
      <div v-for="(input, idx) in inputs" :key="idx" class="form__field">
        <InputTextarea
          v-if="input.type === 'textarea'"
          :id="input.id"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :error="input.error"
          :validators="input.validators"
          class="form__textarea"
        />
        <InputField
          v-else
          :id="input.id"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :error="input.error"
          :validators="input.validators"
          class="form__input"
        />
      </div>
    </div>
    <LoFiButton type="submit" class="form__form-btn" :disabled="!isFormValid">
      {{ story?.content?.submit_button }}
    </LoFiButton>
  </form>
</template>

<style scoped lang="scss">
.form {
  width: 100%;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  gap: vw(20);
  width: 100%;

  @media (max-width: $br1) {
    gap: 20px;
  }
}

.form__form-btn {
  margin-top: vw(28);

  @media (max-width: $br1) {
    margin-top: 40px;
  }
}
</style>
