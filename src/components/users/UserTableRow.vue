<script setup>
import BaseButton from '@/components/base/BaseButton.vue'

defineProps({
  user: { type: Object, required: true },
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <tr class="user-row">
    <td>{{ user.id }}</td>
    <td>{{ user.name }}</td>
    <td class="text-muted">{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
    <td>
      <div class="user-row__actions">
        <BaseButton variant="ghost" @click="$emit('edit', user)">Edit</BaseButton>
        <BaseButton variant="danger" @click="$emit('delete', user)">Delete</BaseButton>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.user-row td {
  padding: var(--spacing-sm) var(--spacing-md);
  vertical-align: middle;
}
.user-row:hover td {
  background: var(--color-row-hover);
}
.user-row:nth-child(even) td {
  background: var(--color-row-stripe);
}
.user-row:nth-child(even):hover td {
  background: var(--color-row-hover);
}
.user-row__actions {
  display: flex;
  gap: var(--spacing-sm);
}
</style>
