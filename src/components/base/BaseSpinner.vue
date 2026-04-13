<script setup>
defineProps({
  size: { type: String, default: '40px' },
  message: { type: String, default: 'Loading...' },
})
</script>

<template>
  <div class="spinner-wrap" role="status" :aria-label="message">
    <div class="spinner" :style="{ width: size, height: size }" />
    <p v-if="message" class="spinner-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl);
}
.spinner {
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}
.spinner-message {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
