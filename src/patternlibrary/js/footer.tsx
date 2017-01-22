`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Footer } from "./components/Footer";

const footerInfo = {
  links: [
  {link:'#', label: 'About'},
  {link:'#', label: 'Blog'},
  {link:'#', label: 'Development'},
  ],
  updatedYear: 2017,
  emailLabel: 'Contact Us',
  emailTitle: 'GET US VIA EMAIL',
  emailAddress: 'walcoorperation@gmail.com',
  emailMsg: 'We\'ll definitely get back in touch with you, upon the received email.'
}

ReactDOM.render(
    <Footer {...footerInfo}/>,
    document.getElementById("footer")
);
