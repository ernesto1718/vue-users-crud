import { reactive, ref } from 'vue'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(form) {
  const errors = {}

  if (!form.name || form.name.trim().length < 2)
    errors.name = 'Name is required and must be at least 2 characters.'

  if (!form.username || form.username.trim().length < 2)
    errors.username = 'Username is required and must be at least 2 characters.'
  else if (/\s/.test(form.username)) errors.username = 'Username must not contain spaces.'

  if (!form.email || !EMAIL_REGEX.test(form.email.trim()))
    errors.email = 'A valid email address is required.'

  if (!form.phone || form.phone.trim().length < 6)
    errors.phone = 'Phone is required and must be at least 6 characters.'

  return errors
}

/**
 * @param {'create'|'edit'} mode
 * @param {Object|null} initialData
 */
export function useUserForm(mode = 'create', initialData = null) {
  const form = reactive({
    name: initialData?.name ?? '',
    username: initialData?.username ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
  })

  const errors = reactive({ name: '', username: '', email: '', phone: '' })
  const touched = reactive({ name: false, username: false, email: false, phone: false })
  const submitAttempted = ref(false)

  function touchField(field) {
    touched[field] = true
    const result = validateForm(form)
    errors[field] = result[field] ?? ''
  }

  function validate() {
    submitAttempted.value = true
    const result = validateForm(form)
    Object.assign(errors, { name: '', username: '', email: '', phone: '', ...result })
    return Object.keys(result).length === 0
  }

  function resetForm() {
    Object.assign(form, { name: '', username: '', email: '', phone: '' })
    Object.assign(errors, { name: '', username: '', email: '', phone: '' })
    Object.assign(touched, { name: false, username: false, email: false, phone: false })
    submitAttempted.value = false
  }

  return { form, errors, touched, submitAttempted, touchField, validate, resetForm, mode }
}
