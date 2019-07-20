import produce from "immer";
import * as React from 'react';
import Post from '../components/Post';

interface AboutState {
  canClick: boolean;
}

const posts = [
  {title: 'Post 1', text: 'Post 1 Text', icon: 'adn'},
  {title: 'Post 2', text: 'Post 2 Text', icon: 'adn'},
  {title: 'Post 3', text: 'Post 3 Text', icon: 'adn'},
];

class About extends React.PureComponent<{}, AboutState> {

  constructor(props:any) {
    super(props);
    this.state = {
      canClick: false
    }
  }

  clickAbout = () => {
    this.setState(
      produce<AboutState>(draft => {
        draft.canClick = !draft.canClick;
      })
    );
  }

  render() {
    if(this.state.canClick) {
      alert("HI");
    }
    return (
      <div onClick={this.clickAbout}>About<Post postItems={posts}/></div>
    );
  }
}

export default About;
