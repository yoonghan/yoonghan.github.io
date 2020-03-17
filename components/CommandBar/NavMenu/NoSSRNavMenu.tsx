`use strict`

import * as React from "react";
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from "next/dist/client/with-router";
import {LINK} from "../../../shared/style";

export interface NoSSRNavMenuProps extends WithRouterProps {
}

const writeLink = (router: NextRouter) => {
  const pathname = router.pathname;
  const paths = pathname.split("/");
  let accumulatedPath = "";
  const splittedLinks = paths.map((path) => {
    if(path === "") {
      return (<a href={"/"} key={`_linkroot`} className={"navmenu-link"}>/</a>)
    }
    else {
      accumulatedPath += "/" + path;
      return (
          <a href={accumulatedPath} key={`_link${path}`} className={"navmenu-link"}>
            <span> </span>{path}/
          </a>)
    }
  });
  return splittedLinks;
}

const goBack = (router: NextRouter) => () => {
  const pathname = router.pathname;
  const pathnameWithoutTrailingSlash = pathname.substring(0,pathname.length-1)

  const lastIdx = pathnameWithoutTrailingSlash.lastIndexOf("/");
  router.push(pathnameWithoutTrailingSlash.substr(0, lastIdx===0? 1:lastIdx));
}

const NoSSRNavMenu: React.SFC<NoSSRNavMenuProps> = ({router}) => {

  return (
    <nav className="container">

        <div className="return-btn" onClick={goBack(router)}>
          <i className="fas fa-chevron-left"/>
        </div>
        {writeLink(router)}

      <style jsx>{`
        .container {
          display: flex;
          color: ${LINK.FOREGROUND};
          padding: 1.5rem;
        }
        .return-btn {
          //padding: 1rem;
        }
        .title {
          //padding: 1rem;
        }
        .container div {
          color: ${LINK.FOREGROUND};
          font-size: 2rem;
          cursor: pointer;
        }
        :global(.navmenu-link) {
          padding-left: 10px;
          padding-top: 0.5rem;
          text-decoration: none;
          color: ${LINK.FOREGROUND};
        }
      `}</style>
    </nav>
  );
}

export default withRouter(NoSSRNavMenu);
