/* eslint-disable no-console */

export function register(swPath?: string, options?: RegistrationOptions) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(swPath || "/sw.js", options)
      .then(function (registration) {
        console.log("SW registered: ", registration)
      })
      .catch(function (registrationError) {
        console.warn("SW registration failed: ", registrationError)
      })
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister()
    })
  }
}
