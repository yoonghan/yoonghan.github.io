import HtmlHead from "@/components/HtmlHead"
import Head from "next/head"
import Menu from "@/components/Menu"
import dynamic from "next/dynamic"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"

const ExperimentalSsr = dynamic(
  () => import("@/pageComponents/Performance/HeavyLoader"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading Experimental Performance
      </div>
    ),
  }
)

const Performance = () => {
  return (
    <>
      <HtmlHead
        title={"Performance"}
        description={"Page to test performance of renders."}
      />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Menu />

      <ExperimentalSsr />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export const config = { runtime: "nodejs" }

export default Performance
