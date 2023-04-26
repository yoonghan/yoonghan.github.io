import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Menu from "@/components/Menu"
import Chatter from "@/pageComponents/Projects/Chatter"

const WebRtc = () => {
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

export const config = { runtime: "nodejs" }

export default WebRtc
