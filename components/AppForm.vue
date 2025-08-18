<script lang="ts" setup>
import { useFormStory } from '~/composables/stories/formStory'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  minLength,
  email as emailRule,
  helpers,
} from '@vuelidate/validators'
import { InputField, InputTextarea } from '#components'

interface IFormModel {
  name: string
  email: string
  message: string
}

const validators = {
  required: helpers.withMessage('This field is required.', required),
  email: helpers.withMessage('Invalid email.', emailRule),
  min2: helpers.withMessage('Please enter at least 2 characters', minLength(2)),
  min10: helpers.withMessage(
    'Please enter at least 10 characters',
    minLength(10)
  ),
}

const { story } = await useFormStory()
const { showThankYou } = useThankyouScreen()

const formModel = reactive<IFormModel>({
  name: '',
  email: '',
  message: '',
})

const rules = computed(() => ({
  name: { required: validators.required, minLength: validators.min2 },
  email: { required: validators.required, email: validators.email },
  message: { required: validators.required, minLength: validators.min10 },
}))

const v$ = useVuelidate(rules, formModel)

const inputs = computed(() => [
  {
    id: 'form-name',
    name: 'name',
    type: 'text',
    placeholder: story?.value?.content?.name_field || 'name',
    required: true,
  },
  {
    id: 'form-email',
    name: 'email',
    type: 'email',
    placeholder: story?.value?.content?.email_field || 'email',
    required: true,
  },
  {
    id: 'form-message',
    name: 'message',
    type: 'textarea',
    placeholder: story?.value?.content?.message_field || 'tape ton message',
    required: true,
  },
])

const resetForm = () => {
  Object.keys(formModel).forEach(key => (formModel[key] = ''))
  v$.value.$reset()
}

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  console.log('Submitting payload:', { ...formModel })

  showThankYou()
  resetForm()
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="onSubmit">
    <div class="form__inputs">
      <div
        v-for="(input, idx) in inputs"
        :key="input.id || idx"
        class="form__field"
      >
        <component
          :is="input.type === 'textarea' ? InputTextarea : InputField"
          :id="input.id"
          v-model="formModel[input.name]"
          :name="input.name"
          :placeholder="input.placeholder"
          :required="input.required"
          :errors="v$[input.name].$errors"
          :class="input.type === 'textarea' ? 'form__textarea' : 'form__input'"
          @blur="v$[input.name].$touch()"
        />
      </div>
    </div>

    <LoFiButton
      type="submit"
      class="form__form-btn"
      :disabled="v$.$invalid || v$.$pending"
    >
      {{ story?.content?.submit_button }}
    </LoFiButton>
    <ModalsThankyouModal />
  </form>
</template>

<style lang="scss">
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
  @include regular;
  text-transform: capitalize;
  padding: vw(14) vw(40);
  margin-top: vw(28);
  font-size: vw(16);

  @media (max-width: $br1) {
    font-size: 16px;
    letter-spacing: -0.03em;
    margin-top: 40px;
  }
}
</style>
