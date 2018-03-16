`use strict`

import * as React from "react";

import {TrianglifyCanvas} from './TrianglifyCanvas';

import '../../scss/base.scss';
var styles = require('../../scss/components/MainScreen.scss');
declare function require(path: string): any;

interface SliderDisplayItem {
  text:string;
  link?: string;
}

export interface SliderDisplayItemProps {
  itemArray: Array<SliderDisplayItem>;
}

export class MainScreen extends React.PureComponent<SliderDisplayItemProps, {}> {
  constructor(props:any) {
    super(props);
  }

  renderItems = () => {
    const technologies = this.props.itemArray;
    return technologies.map(function(item) {
      const {text, link} = item;
      let techlink = (typeof link === 'undefined' ? '#': link);

      return (<div className={styles['mainscr-slider-item']} key={text}>
        <h3>
          <a href={techlink} target="_blank" className='links'>
            {text} - <i className='fa fa-link'></i>
          </a>
        </h3>
        </div>);
    });
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className={styles.mainscr}>
        <div className={styles['mainscr-container']}>
          <img className={styles['mainscr-company']} src="/ext/img/logo/companyName.svg"/>
          <TrianglifyCanvas className={styles['mainscr-cover']}/>
        </div>
      </div>
    );
  };
}
