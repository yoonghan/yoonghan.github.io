import { useState, useEffect, useCallback } from "react"
import { ANDROID_PACKAGE_NAME } from "./utils/const"
import { register } from "./utils/register"
/**
If await navigator.serviceWorker.getRegistration(domain) is returning as undefined after registered.
Do.
1) Delete the service worker from console's application
2) Browse another website before returning to the domain, this is to clear Service worker
3) Return back to the domain and register service worker again before running navigator.serviceWorker.getRegistration(domain)
If reinstalling is fast as download are from cache
1) Unregister service worker
2) Go to Application tab in Chrome debug
3) Look into Storage and right-click to delete those that the domain is running in.
4) Look into Storage -> Cache Storage and delete all workbox
**/

export function usePwaHooks(autoRegisterForApp: boolean) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isTwaApp, setIsTwaApp] = useState(false)
  const [isOffline, setIsOffline] = useState<boolean>(false)
  const [hasLatestUpdate, setHasLatestUpdate] = useState<boolean>(false)
  const [isLatestInstalled, setIsLatestInstalled] = useState<boolean>(false)

  useEffect(() => {
    if (navigator && navigator.serviceWorker && navigator.serviceWorker.ready) {
      setIsOffline(!navigator.onLine)
      navigator.serviceWorker.ready.then((swRegistry) => {
        if (swRegistry) {
          if (swRegistry.active) {
            const activeRegistry = swRegistry.active
            activeRegistry.addEventListener("statechange", () => {
              setIsRegistered(activeRegistry.state === "activated")
            })
          }
          swRegistry.addEventListener("updatefound", () => {
            setHasLatestUpdate(true)
            const newSW = swRegistry.installing
            if (newSW !== null) {
              newSW.addEventListener("statechange", () => {
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
        if (swRegistry.active) {
          const activeRegistry = swRegistry.active
          activeRegistry.addEventListener("statechange", () => {
            setIsRegistered(activeRegistry.state === "activated")
          })
        }

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
