import * as React from "react";
import produce, {Draft} from "immer";
import dynamic from "next/dynamic";

const NoSSRChatFeed = dynamic(
  () => import('react-bell-chat').then(mod => mod.ChatFeed),
  { ssr: false }
)

export const NoSSRChatMessageBoxProps = {
  OTHERS: 1,
  SENDER: 2,
  SYSTEM: undefined
};

export class NoSSRChatMessageBox extends React.Component {

  constructor(props) {
    super(props);
    this.chatScroll = undefined;
    this.authors = this._initAuthors();
    this.authorsCount = this.authors.length;
    this.state = {
      messages: []
    }
  }

  _initAuthors = () => {
    return [
      {
        id: 1,
        name: 'Others',
        avatarName: "O",
        isTyping: true,
        lastSeenMessageId: 1,
        bgImageUrl: undefined
      },
      {
        id: 2,
        name: 'Sender',
        avatarName: "S",
        isTyping: false,
        lastSeenMessageId: 1,
        bgImageUrl: undefined
      }
    ];
  }

  addMessage = (senderId, message) => {
    this.setState(
      produce((draft) => {
        draft.messages.push({
          id: senderId,
          authorId: senderId,
          message: message,
          createdOn: new Date(),
          isSend: true
        });
      })
    );
  }

  _triggerFeed = (api) => {
    const chatScroll = this.chatScroll;
    if(api && api !== null) {
      if(chatScroll && chatScroll.scrollTo) {
        chatScroll.scrollTo(0, chatScroll.scrollHeight);
      }
      else {
        this.chatScroll = document.getElementsByClassName("react-bell-chat__chat-scroll-area")[0];
      }
    }

  }

  render() {
    const {messages} = this.state;
    return (
      <div className={"container"}>
        <NoSSRChatFeed
          messages={messages}
          authors={this.authors}
          yourAuthorId={this.authorsCount}
          showRecipientAvatar={true}
          minHeight = {400}
          maxHeight = {400}
          ref={this._triggerFeed}
        />
        <style jsx>{`
          .container {
            background-color: #FFFFFF;
          }
        `}
        </style>
      </div>
    )
  }
}

export default NoSSRChatMessageBox;
