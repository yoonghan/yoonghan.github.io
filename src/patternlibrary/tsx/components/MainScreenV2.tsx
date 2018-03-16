`use strict`

import * as React from "react";
import { Button } from 'react-toolbox/lib/button';

import { TrianglifyCanvas } from './TrianglifyCanvas';

import '../../scss/base.scss';
var styles = require('../../scss/components/MainScreenV2.scss');
declare function require(path: string): any;

export interface MainScreenV2Props {
  mainScreenV2Text: string,
  mainScreenV2ConceptText: string,
  mainScreenV2Description: string,
  mainScreenV2BtnText: string,
  mainScreenV2BtnLink: string
}

export class MainScreenV2 extends React.PureComponent<MainScreenV2Props, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {

    const {mainScreenV2Description, mainScreenV2Text, mainScreenV2ConceptText, mainScreenV2BtnText, mainScreenV2BtnLink} = this.props;

    return (
      <div className={styles.mainscr}>
        <div className={styles['mainscr-container']}>
          <TrianglifyCanvas className={styles['mainscr-cover']}/>
          <div className={styles['mainscr-banner']}>
            <div className={styles['mainscr-banner-inner']}>
              <h2>{mainScreenV2Text}</h2>
              <h4>{mainScreenV2ConceptText}</h4>
            </div>
          </div>
          <div className={styles['mainscr-content']}>
            <div className={styles['mainscr-description']}>
              <span>Wal</span><span>cron</span> {mainScreenV2Description}
              <div className={styles['mainscr-divider']}/>
              <Button label={mainScreenV2BtnText} className={'mainscr-know-us'} href={mainScreenV2BtnLink} raised primary/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
