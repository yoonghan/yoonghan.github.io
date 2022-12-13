import { ChatFeed, Message, ChatFeedApi, Author } from "react-bell-chat"

interface Props {
  messages: Message[]
  authors: Author[]
  height: number
  yourAuthorId: number
}

const NoSSRChatFeed = ({ messages, authors, height, yourAuthorId }: Props) => {
  const triggerFeed = (api: ChatFeedApi) => {
    api?.scrollApi?.scrollToBottom("smooth")
  }

  const requiredHeight = Math.abs(height / 2)

  return (
    <ChatFeed
      messages={messages}
      authors={authors}
      yourAuthorId={yourAuthorId}
      showRecipientAvatar={true}
      minHeight={requiredHeight}
      maxHeight={requiredHeight}
      ref={triggerFeed as any}
    />
  )
}

export default NoSSRChatFeed
