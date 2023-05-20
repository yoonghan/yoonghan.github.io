import { cookies } from "next/headers"
import IndexLayer2 from "./homepage/page-layer2"

const Index = () => {
  const termsRead = !!cookies().get("termsRead") //cannot use import for name

  return <IndexLayer2 termsRead={termsRead} />
}

export default Index
