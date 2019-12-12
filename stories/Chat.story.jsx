import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import NoSSRChatMessageBox, {NoSSRChatMessageBoxProps} from "../components/NoSSRChatMessageBox";

class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.chatMessageBoxRef = React.createRef();
    this.meTime1;
    this.meTime2;
    this.meTime3;
  }

  componentDidMount() {
    const intervalWait = 1000;
    this.meTime1 = setTimeout(
      () => {
        this.chatMessageBoxRef.current.addMessage(
        NoSSRChatMessageBoxProps.OTHERS,
        "I am others")
      }
      , intervalWait);

    this.meTime2 = setTimeout(
      () => {
        this.chatMessageBoxRef.current.addMessage(
        NoSSRChatMessageBoxProps.SENDER,
        "I am me")
      }
      , intervalWait * 2);

    this.meTime3 = setTimeout(
      () => {
        this.chatMessageBoxRef.current.addMessage(
          NoSSRChatMessageBoxProps.SYSTEM,
          "System Message")
      }
      , intervalWait * 3);
  }

  componentWillUnmount() {
    if(this.meTime1) {
      clearTimeout(this.meTime1);
    }
    if(this.meTime2) {
      clearTimeout(this.meTime2);
    }
    if(this.meTime3) {
      clearTimeout(this.meTime3);
    }
  }

  render() {
    return (
      <div style={{width:"400px", height:"400px", background:"#000", padding: "20px"}}>
        <NoSSRChatMessageBox ref={this.chatMessageBoxRef}/>
      </div>
    );
  }

}

const stories = storiesOf(`${BASIC_MENU}/Text`, module);
stories.add('Chatbox', () => <Component/>);
