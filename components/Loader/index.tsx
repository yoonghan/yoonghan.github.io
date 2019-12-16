import React from "react";
import { Spring } from 'react-spring';

interface ILoaderProps {
  hide: boolean
}


class Loader extends React.PureComponent<ILoaderProps, {}> {
  static style = (styleprops:any) => {
    const {props} = styleprops;
    return {
      position: "absolute" as "absolute",
      border: "10px solid white",
      borderRadius: "100%",
      height: props.diameter,
      left: "50%",
      opacity: props.opacity,
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      width: props.diameter,
      zIndex: 1
    }
  };
  private _hidden:boolean;
  private _idName = "walcron_id_loader";

  constructor(props:ILoaderProps) {
    super(props);
    this._hidden = props.hide || false;
  }

  _handleRest = () => {
    this.forceUpdate();
  };

  //Not to use State, conflicts with state changes
  show = () => {
    (document as any).getElementById(this._idName).style.display = 'block';
  }

  hide = () => {
    (document as any).getElementById(this._idName).style.display = 'none';
  }

  render() {
    return (
      <div style={{"display":(this._hidden?"none":"block")}} id={this._idName}>
        <Spring
          reset
          from={{ opacity: 1, diameter: 0 }}
          to={{ opacity: 0, diameter: 100 }}
          onRest={this._handleRest}
        >
          {props => <div style={Loader.style({ props })} />}
        </Spring>
      </div>
    );
  }
}

export default Loader;
