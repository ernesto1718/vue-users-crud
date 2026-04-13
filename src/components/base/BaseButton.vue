<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'danger', 'ghost'].includes(v),
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['base-btn', `base-btn--${variant}`, { 'base-btn--loading': loading }]"
  >
    <span v-if="loading" class="base-btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: background-color var(--transition-fast), opacity var(--transition-fast);
}
.base-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.base-btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.base-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}
.base-btn--danger {
  background: var(--color-danger);
  color: #fff;
}
.base-btn--danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}
.base-btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.base-btn--ghost:hover:not(:disabled) {
  background: var(--color-row-hover);
}
.base-btn__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}
@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
