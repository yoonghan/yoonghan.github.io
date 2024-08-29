"use client"

/**
 * Made for EUROPEAN regulation, but this site do not use cookies.
 * For references, pages/* need to provide the context in getInitialProps and
 * pass into the props.
 **/

import { useCallback, useEffect, useState } from "react"
import Button from "@/components/Button"
import Link from "@/components/Link"
import Image from "next/image"
import ReactGA from "react-ga4"

const cookiePrivacy = "https://policies.google.com/technologies/cookies"
const cookieName = "termsGranted"

type Props = { ga4Id: string }

function ClientCookie({ ga4Id }: Props) {
  const [isCookieRead, setCookieRead] = useState(true)

  const acceptGAConsent = useCallback(() => {
    ReactGA.gtag("consent", "update", {
      analytics_storage: "granted",
    })
  }, [])

  const onCookieReadClicked = useCallback(() => {
    document.cookie = `${cookieName}=true;secure;path=/;SameSite=Lax;max-age=2592000`
    setCookieRead(true)
    acceptGAConsent()
  }, [acceptGAConsent])

  useEffect(() => {
    function getCookie(cname: string) {
      let name = cname + "="
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(";")
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == " ") {
          c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ""
    }

    const cookieWasRead = !!getCookie(cookieName)
    setCookieRead(cookieWasRead)

    if (!ReactGA.isInitialized) {
      ReactGA.initialize(ga4Id)
    }

    ReactGA.gtag("consent", "default", {
      ad_storage: "denied", //Enables storage (such as cookies) related to advertising.
      ad_user_data: "denied", //Sets consent for sending user data related to advertising to Google.
      ad_personalization: "denied", //Sets consent for personalized advertising.
      analytics_storage: "denied", //Enables storage (such as cookies) related to analytics e.g. visit duration.
    })
    if (cookieWasRead) {
      acceptGAConsent()
    }
  }, [acceptGAConsent, ga4Id])

  if (isCookieRead) {
    return <></>
  } else {
    return (
      <div
        data-testid="cookie-dialog"
        className={`bg-yellow-50 border-y border-slate-600 drop-shadow-xl animate-[grow_1s_ease-in] z-[101] fixed p-4 w-full top-0 gap-4 items-center md:top-auto md:bottom-0 md:flex`}
      >
        <Image
          src="/img/logo/logo-color.svg"
          height={50}
          width={50}
          alt="Walcron"
          className="hidden md:block"
        />
        <div className="md:flex-1">
          <strong>This site uses cookies.</strong>
          <hr className="my-2 border-slate-600" />
          <p className="mb-4">
            This site uses cookie to monitor visits and usage traffics through
            google analytics, please to{" "}
            <Link href={cookiePrivacy} target="_blank">
              Google Analytic site
            </Link>
            .
          </p>
        </div>
        <Button onClick={onCookieReadClicked}>Accept</Button>
      </div>
    )
  }
}

export default ClientCookie
