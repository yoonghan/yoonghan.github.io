import * as React from "react";
import NoSSR from 'react-no-ssr';

const CommandBarNoSSRComponent = React.lazy(() => import('./CommandBarNoSSR'));

const CommandBar: React.SFC<any> = (props) => {
  return (
    <NoSSR>
      <React.Suspense fallback={
        <div className={"header"}>
          Walcron
          <style jsx>{`
            .header {
              text-align: center;
              position: absolute;
              top: 0.5rem;
              left: 1.5rem;
              z-index: 2;
              right: 1.5rem;
            }
            `}
          </style>
        </div>}>
        <CommandBarNoSSRComponent {...props}/>
      </React.Suspense>
    </NoSSR>
  );
}

export default React.memo(CommandBar);
