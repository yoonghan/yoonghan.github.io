`use strict`

import * as React from "react";
import * as ReactDom from "react-dom";
import { Footer as FooterPat }  from "../../patternlibrary/js/components/Footer";

const footerInfo = {
  links: [
  {link:'/about', label: 'About'},
  {link:'//mezzanine.walcron.com/', label: 'Blog'},
  {link:'/develop', label: 'Development'},
  {link:'/technology', label: 'Technology'},
  ],
  updatedYear: 2017,
  emailLabel: 'Contact Us',
  emailTitle: 'GET US VIA EMAIL',
  emailAddress: 'walcoorperation@gmail.com',
  emailMsg: 'We\'ll definitely get back in touch with you, upon the received email.'
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
