import { getCookie, hasCookie } from "cookies-next"
import type { NextPageContext } from "next"
import Homepage from "@/pageComponents/Homepage"

interface Props {
  termsRead: boolean
}

function Index({ termsRead }: Props) {
  return <Homepage termsRead={termsRead} />
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
