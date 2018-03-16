`use strict`
import * as React from "react";

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface OverlayIndicatorProps {
  total: number;
  selection: number;
}

export class OverlayIndicator extends React.PureComponent<OverlayIndicatorProps, {}> {

  static imageAngleStart = 90;

  render() {
    const {total, selection} = this.props;
    const adjTotal = total - 1;
    const angle = Math.floor(180 / adjTotal * selection);
    const adjAngle = angle - OverlayIndicator.imageAngleStart;
    const degInRad = angle * (Math.PI / 180.0);
    const translateY = (Math.sin(degInRad) * 140 * -1) - 20;
    const translateX = ((Math.cos(degInRad) * 140) - 140) * -1;
    const rotation = {transform: 'translate(' +translateX + 'px,' + translateY + 'px) rotate(' + adjAngle + 'deg)'};

    return (
      <div className={styles['overlaycard-bg-big']}>
        <div className={styles['overlaycard-bg-indicator']} style={rotation}>
        </div>
      </div>
    )
  }
}
