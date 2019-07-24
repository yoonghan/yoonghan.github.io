`use strict`

import * as React from "react";
import produce, {Draft} from "immer";
import {MainLayout} from "../MainLayout";

export interface RotatingIconProps {
  icon: string;
}

interface RotatingIconState {
  pos: number;
}

export class RotatingIcon extends React.PureComponent<RotatingIconProps, RotatingIconState> {
  constructor(props:RotatingIconProps) {
    super(props);
    this.state = {
      pos: 0
    };
  };

  componentDidMount() {
    window.addEventListener('scroll', this._updateIcon, false);
  }

  _updateIcon = () => {
    this.setState(
      produce((draft:Draft<RotatingIconState>) => {
        draft.pos = draft.pos + 10;
      })
    );
  };

  render() {
    const {pos} = this.state;
    const {icon} = this.props;
    return (
      <React.Fragment>
        <MainLayout/>
        <i className={`fab fa-${icon}`} aria-hidden="true" style={{transform: 'rotate('+ pos +'deg)'}}>A</i>
      </React.Fragment>
    );
  }

}
