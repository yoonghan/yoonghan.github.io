import * as React from "react";
import { withRouter } from 'next/router';
import ButtonsBar from "../ButtonsBar";
import {ILink} from "../ButtonsBar";
import { WithRouterProps } from "next/dist/client/with-router";

const AVAILABLE_MENUS:Array<ILink> = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About',
    link: '/about'
  },
  {
    title: 'Showcase',
    link: '/creation'
  }
];

interface NoSSRMobileMenuProps extends WithRouterProps {
}

const NoSSRMobileMenu:React.FC<NoSSRMobileMenuProps> = (props) => {
  const _getIndex = () => {
    const routerLocation = props.router.route;
    for(let i=0; i < AVAILABLE_MENUS.length; i++) {
      if(AVAILABLE_MENUS[i].link === routerLocation) {
        return i;
      }
    }
    return 0;
  }

  return (
    <React.Fragment>
      <ButtonsBar menuTexts={AVAILABLE_MENUS} activeIndex={_getIndex()}/>
    </React.Fragment>
  );
}

export default withRouter(NoSSRMobileMenu);
