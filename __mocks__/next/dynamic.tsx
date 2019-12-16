import * as React from "react";

//NOTE: Checkout https://github.com/FormidableLabs/jest-next-dynamic for real dynamic test.

export interface IDynamicProps {
  messages: any;
  authors: any;
  yourAuthorId: any;
  showRecipientAvatar: any;
  minHeight: number;
  maxHeight: number;
}

export class Dynamic extends React.Component<IDynamicProps,{}> {
  render() {
    return <div/>
  }
}

export default () => Dynamic;
