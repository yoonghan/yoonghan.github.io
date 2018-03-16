`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { HeaderLocale } from "../util/Locale";
import { HeaderV2, HeaderV2Props }  from "../../patternlibrary/tsx/components/HeaderV2";

const locale = new HeaderLocale();

const headerProps = {linkArray: [
  {
    title: locale.translate('about'),
    icon: "question",
    path: "/about"
  },
  {
    title: locale.translate('profile'),
    icon: "superpowers",
    path: "/portfolio"
  },
  {
    title: locale.translate('tech'),
    icon: "cog",
    path: "/technology"
  },
  {
    title: locale.translate('develop'),
    icon: "microchip",
    path: "/develop"
  },
  {
    title: locale.translate('home'),
    icon: "home",
    path: "/"
  }
]};

export interface HeaderProps {
  menuOpened?: Boolean;
  isHomepage?: boolean;
}

export class Header extends React.PureComponent<HeaderProps, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <HeaderV2 linkArray={headerProps.linkArray} isHomepage={this.props.isHomepage}/>
    )
  }
}
