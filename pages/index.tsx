import Banner from "@/components/Banner"
import Cookie from "@/components/Cookie"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import cookies from "next-cookies"

interface Props {
  termsRead: string
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
        <Banner />
      </main>

      <Cookie isClosed={termsRead === "true"} cookieName={"termsRead"} />
      <Footer />
    </div>
  )
}

Home.getInitialProps = async (ctx: any) => {
  return {
    termsRead: cookies(ctx).termsRead || "false",
  }
}

export default Home
