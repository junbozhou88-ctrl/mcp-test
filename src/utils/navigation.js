export function readRoute() {
  return window.location.hash.replace('#', '') || '/'
}

export function navigate(path) {
  window.location.hash = path
}
