<script setup>
import UserTableRow from './UserTableRow.vue'

defineProps({
  users: { type: Array, required: true },
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="table-wrapper">
    <table v-if="users.length > 0" class="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <UserTableRow
          v-for="user in users"
          :key="user.id"
          :user="user"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </tbody>
    </table>
    <div v-else class="table-empty">
      <p>No users found. Add one to get started.</p>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-bg-white);
}
.user-table th {
  text-align: left;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}
.table-empty {
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--color-text-muted);
  background: var(--color-bg-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}
</style>
