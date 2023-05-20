"use client"

import { getTermsRead } from "./cookie-util"
import Homepage from "./main"

const IndexLayer2 = ({ termsRead }: { termsRead: boolean }) => {
  return <Homepage termsRead={termsRead || getTermsRead()} />
}

export default IndexLayer2
