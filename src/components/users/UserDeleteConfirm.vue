<script setup>
defineProps({
  user: { type: Object, required: true },
})
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="delete-confirm">
    <p class="delete-confirm__message">
      Are you sure you want to delete
      <strong>{{ user.name }}</strong
      >?
      This action cannot be undone.
    </p>
    <div class="delete-confirm__actions">
      <BaseButton variant="ghost" @click="$emit('cancel')">Cancel</BaseButton>
      <BaseButton variant="danger" @click="$emit('confirm')">Delete</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue'
export default { components: { BaseButton } }
</script>

<style scoped>
.delete-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
.delete-confirm__message {
  color: var(--color-text);
  line-height: 1.6;
}
.delete-confirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
</style>
