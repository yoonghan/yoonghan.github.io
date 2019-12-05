import * as React from "react";
import { register, unregister } from 'next-offline/runtime';

class IncludePWA extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  componentDidMount () {
    register()
  }
  componentWillUnmount () {
    unregister()
  }

  render() {
    return (
      <React.Fragment/>
    )
  }
}

export default (IncludePWA);
