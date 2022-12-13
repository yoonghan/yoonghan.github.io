import { usePusher } from "@/components/Chat/usePusher"
import ChatMessageBox from "@/components/Chat/ChatMessageBox"
import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import { useCallback, useEffect, useRef } from "react"
import { GetStaticProps } from "next"
import { MessageHandler } from "@/components/Chat/ChatMessageBox/ChatMessageDialog"
import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck"

interface Props {
  appKey: string
  cluster: string
}

const Messenger = ({ appKey, cluster }: Props) => {
  const chatMessageBoxRef = useRef<MessageHandler>(null)

  const printMessage = useCallback(
    (sender?: number) => (message: string) => {
      if (chatMessageBoxRef.current !== null) {
        chatMessageBoxRef.current.addMessage(sender, message)
      }
    },
    []
  )

  const pusher = usePusher({
    eventName: "walcron_messenger",
    channelName: "FunChat",
    printConnectionCallback: printMessage(undefined),
    printEventCallback: printMessage(2),
    appKey: appKey,
    cluster: cluster,
    nonprivate: false,
    authEndpoint: "/api/pusherauth",
  })

  useEffect(() => {
    pusher.connect()
  }, [pusher])

  const onMessageSend = useCallback(
    (message: string) => {
      pusher.send(message)
    },
    [pusher]
  )

  return (
    <>
      <HtmlHead
        title={"Messenger"}
        description={"Public chat messenger between 2 person."}
      />
      <div>
        <CommandBar />
      </div>
      <hr />
      <section>
        <h1>A Walcron Chat Program</h1>
        <p>
          Used this to test on 3rd party integration and asynchronous replies.
          The reason this was build was to test authentication, code coverage,
          integration and capabilites of asynchronous system.
        </p>
        <ChatMessageBox onMessageSend={onMessageSend} ref={chatMessageBoxRef} />
      </section>
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
  Messenger,
  "Messenger initialization failed due to missing environment variable"
)
