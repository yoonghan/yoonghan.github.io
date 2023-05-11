import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Menu from "@/components/Menu"
import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck"
import WebrtcVideo from "@/pageComponents/Projects/WebrtcVideo"
import { GetStaticProps } from "next"

interface Props {
  appKey: string
  cluster: string
}

const WebRtc = ({ appKey, cluster }: Props) => {
  return (
    <>
      <HtmlHead
        title={"Web RTC"}
        description={"Video,Chat,Data sharing with WebRTC"}
      />
      <Menu />
      <div className="page-aligned-container">
        <h1>Video call with Web RTC</h1>
        <WebrtcVideo appKey={appKey} cluster={cluster} />
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //Note: Document states not to destructure process.env.
  return {
    props: {
      appKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    },
  }
}

export const config = { runtime: "nodejs" }

export default withNonEmptyEnvCheck(
  WebRtc,
  "Pusher initialization failed due to missing environment variable."
)
