<script setup>
import { useUserForm } from '@/composables/useUserForm.js'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps({
  mode: { type: String, default: 'create', validator: (v) => ['create', 'edit'].includes(v) },
  initialData: { type: Object, default: null },
})
const emit = defineEmits(['submit', 'cancel'])

const { form, errors, touchField, validate, resetForm } = useUserForm(props.mode, props.initialData)

function handleSubmit() {
  if (validate()) {
    emit('submit', { ...form })
    resetForm()
  }
}
</script>

<template>
  <div class="user-form">
    <BaseInput
      id="field-name"
      v-model="form.name"
      label="Full Name"
      placeholder="e.g. John Doe"
      :error="errors.name"
      required
      @blur="touchField('name')"
    />
    <BaseInput
      id="field-username"
      v-model="form.username"
      label="Username"
      placeholder="e.g. johndoe"
      :error="errors.username"
      required
      @blur="touchField('username')"
    />
    <BaseInput
      id="field-email"
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="e.g. john@example.com"
      :error="errors.email"
      required
      @blur="touchField('email')"
    />
    <BaseInput
      id="field-phone"
      v-model="form.phone"
      label="Phone"
      placeholder="e.g. 555-1234"
      :error="errors.phone"
      required
      @blur="touchField('phone')"
    />
    <div class="user-form__actions">
      <BaseButton variant="ghost" type="button" @click="emit('cancel')">Cancel</BaseButton>
      <BaseButton variant="primary" type="button" @click="handleSubmit">
        {{ mode === 'edit' ? 'Save Changes' : 'Add User' }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
.user-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}
</style>
