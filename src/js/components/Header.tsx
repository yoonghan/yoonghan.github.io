`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { HeaderLocale } from "../util/Locale";
import { Header as HeaderPat }  from "../../patternlibrary/js/components/Header";

const headerMenu = [
{location: '//mezzanine.walcron.com/', label:'BLOG' , icon:'camera-retro'},
{location: '/portfolio', label:'PORTFOLIO' , icon:'superpowers'}
];

const locale = new HeaderLocale();

export class Header extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <HeaderPat menus={headerMenu} headerTitle={locale.translate('title')}/>
    )
  }
}
