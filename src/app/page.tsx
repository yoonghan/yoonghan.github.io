import { KEY as COOKIE_KEY } from "./homepage/cookie-util"
import { cookies } from "next/headers"
import IndexLayer2 from "./homepage/page-layer2"

const Index = () => {
  const termsRead = cookies().has(COOKIE_KEY)

  return <IndexLayer2 termsRead={termsRead} />
}

export default Index
