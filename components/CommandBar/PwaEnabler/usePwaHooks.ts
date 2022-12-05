import { useState, useEffect, useCallback } from "react"
import { ANDROID_PACKAGE_NAME } from "./utils/const"
import { register } from "./utils/register"
/**
If await navigator.serviceWorker.getRegistration(domain) is returning as undefined after registered.
Do.
1) Delete the service worker from console's application
2) Browse another website before returning to the domain, this is to clear Service worker
3) Return back to the domain and register service worker again before running navigator.serviceWorker.getRegistration(domain)
**/

export function usePwaHooks(autoRegisterForApp: boolean) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isTwaApp, setIsTwaApp] = useState(false)
  const [isOffline, setIsOffline] = useState<boolean>(false)
  const [hasLatestUpdate, setHasLatestUpdate] = useState<boolean>(false)
  const [isLatestInstalled, setIsLatestInstalled] = useState<boolean>(false)

  useEffect(() => {
    if (navigator && navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration) {
          registration.addEventListener("offline", (event) => {
            setIsOffline(true)
          })
          registration.addEventListener("updatefound", (event) => {
            setHasLatestUpdate(true)
            const newSW = registration.installing
            if (newSW !== null) {
              newSW.addEventListener("statechange", (event) => {
                if (newSW.state === "installed") {
                  setIsLatestInstalled(true)
                }
              })
            }
          })
        }
      })
    }
  }, [])

  async function getRegistration() {
    const domain = window.location.hostname
    if (navigator && navigator.serviceWorker) {
      const swRegistry = await navigator.serviceWorker.getRegistration(domain)

      if (swRegistry) {
        const isSwRegistered = swRegistry.scope !== ""
        setIsRegistered(isSwRegistered)
        return
      }
    }
    setIsRegistered(false)
  }

  useEffect(() => {
    //utm_source is based on start_url defined in manifest.json
    if (
      document.referrer.includes(`android-app://${ANDROID_PACKAGE_NAME}`) ||
      location.href.includes("?utm_source=launcher")
    ) {
      setIsTwaApp(true)
      if (autoRegisterForApp) {
        register()
      }
    }

    getRegistration()
  }, [autoRegisterForApp])

  return {
    isRegistered,
    isTwaApp,
    getRegistration,
    hasLatestUpdate,
    isLatestInstalled,
    isOffline,
  }
}
