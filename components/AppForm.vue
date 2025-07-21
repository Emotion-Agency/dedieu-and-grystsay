<script lang="ts" setup>
import { useFormStory } from '~/composables/stories/formStory'
import type { IForm } from '~/types/form'

const { story } = await useFormStory()
const { showThankYou } = useThankyouScreen()

const formModel = reactive<IForm>({
  name: { value: '', error: null },
  email: { value: '', error: null },
  message: { value: '', error: null },
})

const inputs = reactiveComputed(() => [
  {
    id: `form-name`,
    name: 'name',
    type: 'text',
    placeholder: story?.value?.content?.name_field || 'name',
    required: true,
    value: formModel.name.value,
    error: formModel.name?.error,
  },
  {
    id: `form-email`,
    name: 'email',
    type: 'email',
    placeholder: story?.value?.content?.email_field || 'email',
    required: true,
    value: formModel.email.value,
    error: formModel.email?.error,
  },
  {
    id: `form-message`,
    name: 'message',
    type: 'textarea',
    placeholder: story?.value?.content?.message_field || 'tape ton message',
    required: true,
    value: formModel.message.value,
    error: formModel.message?.error,
  },
])

const onSubmit = e => {
  e.preventDefault()
  console.log(formModel)
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
          v-model="formModel[input.name].value"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :error="input.error"
          class="form__textarea"
        />
        <InputField
          v-else
          :id="input.id"
          v-model="formModel[input.name].value"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :error="input.error"
          class="form__input"
        />
      </div>
    </div>
    <LoFiButton type="submit" class="form__form-btn">
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
