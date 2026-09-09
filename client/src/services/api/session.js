// Who is signed in, for the duration of this page load.
//
// The equipment hierarchy is scoped per account, so requests that can return
// owned rows carry the user id. Kept in its own module so the stores can read
// it without importing React state.
let currentUserId = null

export function setCurrentUser(userId) {
  currentUserId = userId || null
}

export function getCurrentUser() {
  return currentUserId
}

export function clearCurrentUser() {
  currentUserId = null
}

// `?userId=…` when someone is signed in, and nothing when they are not — the
// API then returns only the shared hierarchy.
export function userQuery() {
  return currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : ''
}
