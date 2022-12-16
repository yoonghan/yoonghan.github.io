import { usePusher } from "@/components/Chat/usePusher"
import ChatMessageBox from "@/components/Chat/ChatMessageBox"
import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { GetStaticProps } from "next"
import { MessageHandler } from "@/components/Chat/ChatMessageBox/ChatMessageDialog"
import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck"

interface Props {
  appKey: string
  cluster: string
}

const Messenger = ({ appKey, cluster }: Props) => {
  const chatMessageBoxRef = useRef<MessageHandler>(null)

  const printMessage = (sender?: number) => (message: string) => {
    if (chatMessageBoxRef.current !== null) {
      chatMessageBoxRef.current.addMessage(sender, message)
    }
  }

  const connectionPrinter = useMemo(() => printMessage(undefined), [])
  const eventPrinter = useMemo(() => printMessage(2), [])

  const { connect, disconnect, send } = usePusher({
    eventName: "walcron_messenger",
    channelName: "FunChat",
    printConnectionCallback: connectionPrinter,
    printEventCallback: eventPrinter,
    appKey: appKey,
    cluster: cluster,
    nonprivate: false,
    authEndpoint: "/api/pusherauth",
  })

  /**
   * Found reason that useHook returning "object" does a re-render if as dependency
   */
  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMessageSend = useCallback(
    (message: string) => {
      send(message)
    },
    [send]
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
  "Messenger initialization failed due to missing environment variable."
)
