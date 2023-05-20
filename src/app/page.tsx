"use client"

import { getTermsRead } from "./homepage/cookie-util"
import Homepage from "./homepage/main"

const Index = () => {
  const termsRead = getTermsRead()

  return <Homepage termsRead={termsRead} />
}

export default Index
