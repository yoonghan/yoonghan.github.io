import Banner from "@/components/Banner"
import Cookie from "@/components/Cookie"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Link from "@/components/Link"
import { getCookie, hasCookie } from "cookies-next"
import type { NextPageContext } from "next"

interface Props {
  termsRead: boolean
}

function Home({ termsRead }: Props) {
  return (
    <div className="container">
      <HtmlHead
        title={"Walcron"}
        description={
          "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
        }
      />

      <main>
        <Banner>
          See our progress by visiting us at{" "}
          <Link
            text="Github"
            href="https://github.com/yoonghan/walcron"
            logoUrl="/img/social/git.png"
            logoAltText="Git Logo"
          />
        </Banner>
      </main>

      <Cookie isClosed={termsRead} cookieName={"termsRead"} />
      <Footer />
    </div>
  )
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

export default Home
