export async function register(swPath?: string, options?: RegistrationOptions) {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(swPath || "/sw.js", options)
      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return false
    }
  }
  return false
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister()
    })
  }
}
