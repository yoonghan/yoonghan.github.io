`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { Footer as FooterPat }  from "../../patternlibrary/js/components/Footer";
import { FooterLocale } from "../util/Locale";


const locale = new FooterLocale();

const footerInfo = {
  links: [
  {link:'/about', label: locale.translate('about')},
  {link:'http://tf.walcron.com/', label: locale.translate('blog')},
  {link:'/develop', label: locale.translate('develop')}
  ],
  updatedYear: 2017,
  emailLabel: locale.translate('contactus'),
  emailTitle: locale.translate('contactus.title'),
  emailAddress: 'walcoorperation@gmail.com',
  emailMsg: locale.translate('contactus.msg')
};

export class Footer extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <FooterPat {...footerInfo}/>
    )
  }
}
