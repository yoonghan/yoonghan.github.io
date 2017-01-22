`use strict`

import * as React from "react";

import '../../css/base';
var styles = require('../../css/components/MiniPost');
declare function require(path: string): any;

interface MiniPostState {
  icon?: HTMLElement;
  pos: number;
}

interface IConcept {
  header: string;
  description: string;
}

export interface MiniPostProps {
  title: string;
  text: string;
  icon: string;
  titlePost?: boolean;
  concept?: Array<IConcept>;
}


export class MiniPost extends React.Component<MiniPostProps, MiniPostState> {
  constructor(props:any) {
    super(props);
  };


  createConcept = (conceptMap:IConcept, key:string) => {
    return (
      <li key={key}>
        <span>{conceptMap.header}</span> - {conceptMap.description}
      </li>
    );
  };

  mountPane = (node:HTMLElement) => {
    if (node) {
      this.setState({
        icon: node,
        pos: 0
      });
      window.addEventListener('scroll', () => this.updateIcon(), false);
    }
  };

  updateIcon = () => {
    this.state.pos += 10;
    this.state.icon.style.transform = 'rotate('+ this.state.pos +'deg)';
  };

  render() {
    const {icon, title, text, titlePost, concept} = this.props;
    let titleElement:JSX.Element;

    if(titlePost) {
      titleElement = <h2>{title}</h2>
    }
    else {
      titleElement = <h4>{title}</h4>
    }

    const conceptArray = concept ? concept : [];

    let runningNo = 0;
    const conceptElement = conceptArray.map(
      (conceptItem) => {
        const keyVal = icon + '_' + String(runningNo++);
        return this.createConcept(conceptItem, keyVal)
      }
    );

    return (
      <div className={styles['minipost']}>
        <div className={styles['minipost-hdr']}>
          <i className={'fa fa-' + icon} aria-hidden="true" ref={this.mountPane}></i>
        </div>
        <div className={styles['minipost-itm']}>
          {titleElement}
          <span dangerouslySetInnerHTML={{__html: text}}></span>
          {concept &&
            <ul>{conceptElement}</ul>
          }
        </div>
      </div>
    );
  };
}
