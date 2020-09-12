import * as React from "react";
import NoSSR from 'react-no-ssr';

const CommandBarNoSSRComponent = React.lazy(() => import('./CommandBarNoSSR'));

const CommandBar: React.SFC<any> = (props) => {
  return (
    <NoSSR>
      <React.Suspense fallback={
        <div className={"header"}>
          Initializing
        </div>}>
        <CommandBarNoSSRComponent {...props}/>
      </React.Suspense>
    </NoSSR>
  );
}

export default React.memo(CommandBar);
