import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import TextMessenger from "../components/TextMessenger";
import NoSSRChatMessageBox, {NoSSRChatMessageBoxProps} from "../components/NoSSRChatMessageBox";

class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.chatMessageBoxRef = React.createRef();
    this.timer = [];
  }

  componentDidMount() {
    const intervalWait = 1000;
    this.timer.push(setInterval(
      () => {
        this.chatMessageBoxRef.current.addMessage(
        NoSSRChatMessageBoxProps.OTHERS,
        "I am others")
      }
      , intervalWait));

    this.timer.push(setInterval(
      () => {
        this.chatMessageBoxRef.current.addMessage(
        NoSSRChatMessageBoxProps.SENDER,
        "I am me")
      }
      , intervalWait * 2.5));

    this.timer.push(setInterval(
      () => {
        this.chatMessageBoxRef.current.addMessage(
          NoSSRChatMessageBoxProps.SYSTEM,
          "System Message");
        console.log("System Msg");
      }
      , intervalWait * 3));
  }

  componentWillUnmount() {
    for(let i = 0; i<this.timer.length; i++) {
      clearInterval(this.timer[i]);
    }
  }

  render() {
    return (
      <div style={{width:"720px", height:"500px", background:"#000", padding: "20px"}}>
        <NoSSRChatMessageBox ref={this.chatMessageBoxRef}/>
      </div>
    );
  }

}

const _handleSubmit = (event, value) => {
  event.preventDefault();
  console.log("Nothing");
}

const _handleSuggestions = (_value) => {
  return "suggesting";
}

export const Component1 = () => {
  return (
    <div style={{width:"400px", height:"100px", background:"#000", padding: "20px"}}>
      <TextMessenger
        maxLength={100}
        onBlurCallback={()=>{}}
        onSubmitCallback={_handleSubmit}
        filterSuggestion={_handleSuggestions}
      />
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}/TextField`, module);
stories.add('Chatbox', () => <Component/>);
stories.add('TextMessenger', () => <Component1/>);
