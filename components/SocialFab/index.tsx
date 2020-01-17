import * as React from "react";
import NoSSR from 'react-no-ssr';

const SocialFabNoSSRComponent = React.lazy(() => import('./SocialFabNoSSR'));

const SocialFab: React.SFC<any> = (props) => {
  return (
    <NoSSR>
      <React.Suspense fallback={<React.Fragment/>}>
        <SocialFabNoSSRComponent {...props}/>
      </React.Suspense>
    </NoSSR>
  );
}

export default React.memo(SocialFab);
