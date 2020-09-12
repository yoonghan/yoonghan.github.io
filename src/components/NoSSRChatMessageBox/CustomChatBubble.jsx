import * as React from "react";
import dynamic from "next/dynamic";

const NoSSRChatBubble = dynamic(
  () => import('react-bell-chat').then(mod => mod.ChatBubble),
  { ssr: false }
)

var linkRegex = new RegExp("^(http|https)://");

const CustomChatBubble = (props) => {

  const _renderLink = () => {
    const youAreAuthor = props.message.authorId === props.yourAuthorId;

    return (
      <div className={"layer-1"}>
        <div className={youAreAuthor ? "author-bubble": "sender-bubble"}>
          <a href={props.message.message} target="walcron_tab">
            Shared file - [Click to view]
          </a>
          <span className={"time"}>
            {props.message.createdOn.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
        <style jsx>{`
          .layer-1 {
            position: relative;
            margin-bottom: 2px;
            display: flex;
          }
          .author-bubble {
            position: relative;
            background-color: rgb(0, 132, 255);
            border-radius: 7px 0px 7px 7px;
            margin-right: 0px;
            margin-left: auto;
            max-width: 80%;
            padding: 8px 14px 14px;
          }
          .sender-bubble {
            position: relative;
            background-color: rgb(204, 204, 204);
            border-radius: 0px 7px 7px 0px;
            margin-right: auto;
            margin-left: 0px;
            max-width: 80%;
            padding: 8px 14px 14px;
          }
          .time {
            position: absolute;
            right: 14px;
            bottom: 2px;
            font-size: 9px;
            color: rgba(255, 255, 255, 0.55);
          }
        `}</style>
      </div>
    )
  }

  const _renderChat = () => {
    const isLink = linkRegex.test(props.message.message);
    if(isLink) {
      return _renderLink();
    }
    else {
      return <NoSSRChatBubble {...props}/>;
    }
  }

  return _renderChat();
}

export default CustomChatBubble;
