"use client"

import { useEffect, useState } from "react"
import { updateCookie } from "./cookie-util"
import Homepage from "./main"

const IndexLayer2 = () => {
  const [isCookieRead, setCookieRead] = useState(false)

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
    setCookieRead(!!getCookie("termsRead"))
    updateCookie()
  }, [])

  return <Homepage termsRead={isCookieRead} />
}

export default IndexLayer2
