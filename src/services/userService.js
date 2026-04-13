const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Fetches all users from the API.
 * @returns {Promise<Array>} Array of user objects
 * @throws {Error} If the response is not OK
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`)
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText} (${response.status})`)
  }
  return response.json()
}
