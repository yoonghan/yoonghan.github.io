import { getCookie, hasCookie } from "cookies-next"
import type { NextPageContext } from "next"
import Home from "./homepage"

interface Props {
  termsRead: boolean
}

function Index({ termsRead }: Props) {
  return <Home termsRead={termsRead} />
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  return {
    props: {
      termsRead: hasCookie("termsRead", { req, res })
        ? getCookie("termsRead", { req, res })
        : false,
    },
  }
}

export default Index
