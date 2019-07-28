import * as React from "react";
import NoSSR from 'react-no-ssr';
import NoSSRCommandBar from "./NoSSRCommandBar";

const CommandBar: React.SFC = () => {
  return (
    <NoSSR>
      <NoSSRCommandBar/>
    </NoSSR>
  );
}

export default CommandBar;
