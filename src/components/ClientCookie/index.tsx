/**
 * Made for EUROPEAN regulation, but this site do not use cookies.
 * For references, pages/* need to provide the context in getInitialProps and
 * pass into the props.
 **/

import { useCallback, useEffect, useState } from "react"
import Button from "@/components/Button"
import Link from "@/components/Link"

const cookiePrivacy = "https://policies.google.com/technologies/cookies"
const cookieName = "termsRead"

function ClientCookie() {
  const [isCookieRead, setCookieRead] = useState(true)

  const onCookieReadClicked = useCallback(() => {
    document.cookie = `${cookieName}=true;secure;path=/`
    setCookieRead(true)
  }, [])

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

    setCookieRead(!!getCookie(cookieName))
  }, [])

  if (isCookieRead) {
    return <></>
  } else {
    return (
      <div
        data-testid="cookie-dialog"
        className="animate-[grow_1s_ease-in] z-[101] fixed p-4 bg-white text-black w-full top-0 md:top-auto md:bottom-0"
      >
        <strong>This site uses cookies.</strong>
        <hr className="my-2" />
        <p className="mb-4">
          This site uses cookie to monitor visits and usage traffics through
          google analytics, please to{" "}
          <Link href={cookiePrivacy} target="_blank">
            Google Analytic site
          </Link>
          .
        </p>
        <Button onClick={onCookieReadClicked}>Accept</Button>
      </div>
    )
  }
}

export default ClientCookie
