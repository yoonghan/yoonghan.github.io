"use client"

import { useEffect } from "react"
import { updateCookie } from "./cookie-util"
import Homepage from "./main"

const IndexLayer2 = ({ termsRead }: { termsRead: boolean }) => {
  useEffect(() => {
    updateCookie()
  }, [])

  return <Homepage termsRead={termsRead} />
}

export default IndexLayer2
