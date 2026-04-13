<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  id: { type: String, required: true },
})
defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}<span v-if="required" class="base-input__required" aria-hidden="true"> *</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['base-input__field', { 'base-input__field--error': error }]"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" :id="`${id}-error`" class="base-input__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
.base-input__label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}
.base-input__required {
  color: var(--color-danger);
}
.base-input__field {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-bg-white);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
}
.base-input__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.base-input__field--error {
  border-color: var(--color-danger);
}
.base-input__field--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}
.base-input__error {
  font-size: var(--font-size-sm);
  color: var(--color-danger);
}
</style>
