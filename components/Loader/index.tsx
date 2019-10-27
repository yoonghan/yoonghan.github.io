import React, { PureComponent } from "react";
import { Spring } from 'react-spring';

class Loader extends PureComponent {
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

  handleRest = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <Spring
        reset
        from={{ opacity: 1, diameter: 0 }}
        to={{ opacity: 0, diameter: 100 }}
        onRest={this.handleRest}
      >
        {props => <div style={Loader.style({ props })} />}
      </Spring>
    );
  }
}

export default Loader;
