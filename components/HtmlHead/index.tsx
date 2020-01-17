`use strict`

import * as React from "react";
import Head from 'next/head';
import {FOREGROUND, BACKGROUND} from '../../shared/style';

interface HtmlHeadProps {
  title: string;
  description: string;
  nofontawesome?: boolean;
}


export class HtmlHead extends React.Component<HtmlHeadProps, {}> {

  _runPreload = () => {
    const scriptElement = document.getElementById('id-scripts');
    const elements = document.getElementsByTagName("link");
    for(let i=0; i<elements.length; i++) {
      const element = elements[i];

      if(element.rel==="preload" && element.as==="style") {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = element.href;
        scriptElement!.appendChild(link);
      }
    }
  }

  componentDidMount() {
    setTimeout(this._runPreload, 100);
  }

  render() {
    const {title, description, nofontawesome} = this.props;
    return (
      <div className={"XXX"} id="id-scripts">
        <Head>
          <meta charSet="utf-8" key="charset"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport"/>
          <meta name="og:title" content="Walcron Coorperation" key="fb_title"/>
          <meta name="og:type" content="profile" key="fb_type"/>
          <meta name="og:site_name" content="https://www.walcron.com/" key="fb_charset"/>
          <meta property="og:image:type" content="image/png" key="fb_image_t"/>
          <meta property="og:image:width" content="400" key="fb_image_w"/>
          <meta property="og:image:height" content="400" key="fb_image_h"/>
          <meta name="og:image" content="https://www.walcron.com/og_image.png" key="fb_image_i"/>
          <meta name="og:description" content="Welcome to Walcron Coorperation, Malaysia; a site was built for IT research purposes." key="fb_image_desc"/>
          <meta name="fb:admins" content="walcoorperation@gmail.com" key="fb_image_m"/>
          <meta name="description" content={description} key="description"/>
          <title>{title}</title>
          <link rel="preload" as="style" href="/static/css/common.css" key="int_common"/>
          <link rel="preload" as="style" href="/static/css/font.css" key="int_font"/>
          {!nofontawesome && (<link rel="preload" as="style" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" key="font"></link>)}
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <style jsx global>
        {`
          body {
            background: ${BACKGROUND} url("/static/img/bg/type1.jpg") no-repeat left bottom;
            background-size: contain;
            color: ${FOREGROUND};
            position: relative;
            padding: 0;
            margin: 0;
          }
        `}
        </style>
      </div>
    );
  }
}
