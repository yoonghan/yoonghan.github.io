`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { HeaderLocale } from "../util/Locale";
import { Header as HeaderPat }  from "../../patternlibrary/js/components/Header";

const headerMenu = [
{location: 'http://mezzanine.walcron.com/', label:'BLOG' , icon:'camera-retro'},
{location: '/portfolio', label:'PORTFOLIO' , icon:'superpowers'},
{location: '/technology', label:'TECHNOLOGY' , icon:'cog'}
];

const locale = new HeaderLocale();

export interface HeaderProps {
  menuOpened?: Boolean;
}

export class Header extends React.Component<HeaderProps, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <HeaderPat menus={headerMenu} mobileOpensOnLoad={this.props.menuOpened} headerTitle={locale.translate('title')}/>
    )
  }
}
