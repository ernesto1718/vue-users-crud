import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchUsers } from '@/services/userService.js'

export const useUserStore = defineStore('users', () => {
  // --- State ---
  const users = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // --- Getters ---
  const userCount = computed(() => users.value.length)

  // --- Actions ---
  async function loadUsers() {
    isLoading.value = true
    error.value = null
    try {
      users.value = await fetchUsers()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  function addUser(data) {
    const maxId = users.value.length > 0 ? Math.max(...users.value.map((u) => u.id)) : 0
    users.value.push({ ...data, id: maxId + 1 })
  }

  function updateUser(updatedUser) {
    const index = users.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) users.value[index] = { ...updatedUser }
  }

  function deleteUser(id) {
    users.value = users.value.filter((u) => u.id !== id)
  }

  return { users, isLoading, error, userCount, loadUsers, addUser, updateUser, deleteUser }
})
