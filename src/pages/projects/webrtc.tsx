import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Menu from "@/components/Menu"
import { usePresencePusher } from "@/components/pusher/usePresencePusher"
import Chatter from "@/pageComponents/Projects/Chatter"
import { GetStaticProps } from "next"
import { useEffect } from "react"

interface Props {
  appKey: string
  cluster: string
}

const WebRtc = ({ appKey, cluster }: Props) => {
  const { connect } = usePresencePusher({
    appKey,
    cluster,
    authEndpoint: "/api/pusherauth/billy",
    updateConnectionCallback: () => {},
  })

  useEffect(() => {
    connect()
  }, [connect])

  return (
    <>
      <HtmlHead
        title={"Web RTC"}
        description={"Video/Chat/Data sharing with WebRTC"}
      />
      <Menu />
      <div className="page-aligned-container">
        <h1>WebRTC video call, only supports 2 users for now</h1>
        <Chatter />
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

export default WebRtc
