<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore.js'
import UserTable from '@/components/users/UserTable.vue'
import UserForm from '@/components/users/UserForm.vue'
import UserDeleteConfirm from '@/components/users/UserDeleteConfirm.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'

const userStore = useUserStore()

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)

onMounted(() => {
  userStore.loadUsers()
})

// Handlers — Edit
function handleEdit(user) {
  selectedUser.value = user
  showEditModal.value = true
}

// Handlers — Delete
function handleDelete(user) {
  selectedUser.value = user
  showDeleteModal.value = true
}

function confirmDelete() {
  if (selectedUser.value) {
    userStore.deleteUser(selectedUser.value.id)
    showDeleteModal.value = false
    selectedUser.value = null
  }
}

// Handlers — Form submit
function handleCreateSubmit(formData) {
  userStore.addUser(formData)
  showCreateModal.value = false
}

function handleEditSubmit(formData) {
  userStore.updateUser({ ...formData, id: selectedUser.value.id })
  showEditModal.value = false
  selectedUser.value = null
}

// Close modals
function closeCreateModal() {
  showCreateModal.value = false
}
function closeEditModal() {
  showEditModal.value = false
  selectedUser.value = null
}
function closeDeleteModal() {
  showDeleteModal.value = false
  selectedUser.value = null
}
</script>

<template>
  <div class="users-view">
    <!-- Page Header -->
    <header class="users-view__header">
      <div>
        <h1 class="users-view__title">User Management</h1>
        <p class="text-muted">{{ userStore.userCount }} user{{ userStore.userCount !== 1 ? 's' : '' }} total</p>
      </div>
      <BaseButton variant="primary" @click="showCreateModal = true">+ Add User</BaseButton>
    </header>

    <!-- Error State -->
    <div v-if="userStore.error" class="users-view__error" role="alert">
      <p>⚠️ {{ userStore.error }}</p>
      <BaseButton variant="ghost" @click="userStore.loadUsers()">Retry</BaseButton>
    </div>

    <!-- Loading State -->
    <BaseSpinner v-else-if="userStore.isLoading" message="Loading users..." />

    <!-- User Table -->
    <UserTable v-else :users="userStore.users" @edit="handleEdit" @delete="handleDelete" />

    <!-- Create Modal -->
    <BaseModal :is-open="showCreateModal" title="Add New User" @close="closeCreateModal">
      <UserForm mode="create" @submit="handleCreateSubmit" @cancel="closeCreateModal" />
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal :is-open="showEditModal" title="Edit User" @close="closeEditModal">
      <UserForm
        v-if="selectedUser"
        mode="edit"
        :initial-data="selectedUser"
        @submit="handleEditSubmit"
        @cancel="closeEditModal"
      />
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal :is-open="showDeleteModal" title="Delete User" @close="closeDeleteModal">
      <UserDeleteConfirm
        v-if="selectedUser"
        :user="selectedUser"
        @confirm="confirmDelete"
        @cancel="closeDeleteModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.users-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}
.users-view__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
.users-view__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}
.users-view__error {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--border-radius-md);
  color: var(--color-danger);
  margin-bottom: var(--spacing-lg);
}
</style>
