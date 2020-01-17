import * as React from "react";
import NoSSR from 'react-no-ssr';

const SocialFabNoSSRComponent = React.lazy(() => import('./SocialFabNoSSR'));

const SocialFab: React.SFC<any> = (props) => {
  return (
    <NoSSR>
      <SocialFabNoSSRComponent {...props}/>
    </NoSSR>
  );
}

export default React.memo(SocialFab);
