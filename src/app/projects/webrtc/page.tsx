import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck"
import WebrtcVideo from "./WebrtcVideo"
import { site } from "@/config/site"

export const metadata = {
  title: "Video Conferencing",
  description: "Peer to peer Web RTC video conferencing.",
  alternates: {
    ...site.generateCanonical("/projects/webrtc"),
  },
}

interface Props {
  appKey?: string
  cluster?: string
}

const WebRtc = ({ appKey, cluster }: Props) => {
  return (
    <div className="page-aligned-container">
      <h1>Video call with Web RTC</h1>
      <WebrtcVideo appKey={appKey!} cluster={cluster!} />
    </div>
  )
}

const getProcess = () => ({
  appKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
})

export default withNonEmptyEnvCheck(
  WebRtc,
  getProcess,
  "Pusher initialization failed due to missing environment variable."
)
