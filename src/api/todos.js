const API_URL = 'https://jsonplaceholder.typicode.com'

async function getJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('The server could not load this information. Please try again.')
  }

  return response.json()
}

export function getTodos() {
  return getJson(`${API_URL}/todos`)
}

export function getTodo(id) {
  return getJson(`${API_URL}/todos/${id}`)
}

export function getUsers() {
  return getJson(`${API_URL}/users`)
}

export function getUser(id) {
  return getJson(`${API_URL}/users/${id}`)
}
