import { useState, useEffect } from "react"
import { register } from "./utils/register"
/**
If await navigator.serviceWorker.getRegistration(domain) is returning as undefined after registered.
Do.
1) Delete the service worker from console's application
2) Browse another website before returning to the domain, this is to clear Service worker
3) Return back to the domain and register service worker again before running navigator.serviceWorker.getRegistration(domain)
**/

const ANDROID_PACKAGE_NAME = "com.walcron.web"

export function usePwaHooks(autoRegisterForApp: boolean) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isTwaApp, setIsTwaApp] = useState(false)

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

  return { isRegistered, isTwaApp, getRegistration }
}
