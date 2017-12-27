`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { HeaderLocale } from "../util/Locale";
import { Header as HeaderPat }  from "../../patternlibrary/tsx/components/Header";

const headerMenu = [
{location: 'http://tf.walcron.com/', label:'BLOG' , icon:'camera-retro'},
{location: '/portfolio.html', label:'PORTFOLIO' , icon:'superpowers'},
{location: '/technology.html', label:'TECHNOLOGY' , icon:'cog'}
];

const locale = new HeaderLocale();

export interface HeaderProps {
  menuOpened?: Boolean;
  isHomepage?: Boolean;
}

export class Header extends React.Component<HeaderProps, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <HeaderPat menus={headerMenu} mobileOpensOnLoad={this.props.menuOpened} isHomepage={this.props.isHomepage} headerTitle={locale.translate('title')}/>
    )
  }
}
