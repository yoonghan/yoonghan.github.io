import * as React from "react";
import produce, {Draft} from "immer";
import dynamic from "next/dynamic";
import {Author, Message, ChatFeedApi} from "react-bell-chat";

interface NoSSRChatMessageBoxProps {
}

interface NoSSRChatMessageBoxState {
  messages: Array<Message>;
}

const NoSSRChatFeed = dynamic(
  () => import('react-bell-chat').then(mod => mod.ChatFeed),
  { ssr: false }
)

export class NoSSRChatMessageBox extends React.Component<NoSSRChatMessageBoxProps, NoSSRChatMessageBoxState> {
  private authors:Array<Author>;
  private authorsCount:number;
  public static OTHERS = 1;
  public static SENDER = 2;
  public static SYSTEM = undefined;
  private chatScroll:any;

  constructor(props:NoSSRChatMessageBoxProps) {
    super(props);
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

  addMessage = (senderId:number|undefined, message:string) => {
    this.setState(
      produce((draft: Draft<NoSSRChatMessageBoxState>) => {
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

  _triggerFeed = (api: ChatFeedApi) => {
    const chatScroll = this.chatScroll;
    if(api && api !== null) {
      if(chatScroll && chatScroll.scrollTo) {
        (chatScroll as any).scrollTo(0, chatScroll.scrollHeight);
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
