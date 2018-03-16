`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { FooterV2 }  from "../../patternlibrary/tsx/components/FooterV2";
import { FooterLocale } from "../util/Locale";

const locale = new FooterLocale();

const links = [
  {
    text: locale.translate('about'),
    path: "/about"
  },
  {
    text: locale.translate('profile'),
    path: "/portfolio"
  },
  {
    text: locale.translate('tech'),
    path: "/technology"
  },
  {
    text: locale.translate('develop'),
    path: "/develop"
  },
  {
    text: locale.translate('blog'),
    path: "http://tf.walcron.com"
  }
];

export interface FooterProps {
  isHomepage?: boolean;
}

export class Footer extends React.PureComponent<FooterProps, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <FooterV2 updatedYear={2018} linkArray={links} contactInformation={locale.translate('contactus.msg')} isHomepage={this.props.isHomepage}/>
    )
  }
}
