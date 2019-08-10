`use strict`

import * as React from "react";
import Head from 'next/head';
import {FOREGROUND, BACKGROUND} from '../../shared/style';

interface HtmlHeadProps {
  title: string;
  description: string;
}

export const HtmlHead: React.SFC<HtmlHeadProps> = ({title, description}) => {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" key="charset"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport"/>
        <meta name="og:title" content="Walcron Coorperation" key="fb_title"/>
        <meta name="og:type" content="profile" key="fb_type"/>
        <meta name="og:site_name" content="http://www.walcron.com/" key="fb_charset"/>
        <meta property="og:image:type" content="image/png" key="fb_image_t"/>
        <meta property="og:image:width" content="400" key="fb_image_w"/>
        <meta property="og:image:height" content="400" key="fb_image_h"/>
        <meta name="og:image" content="http://www.walcron.com/og_image.png" key="fb_image_i"/>
        <meta name="og:description" content="Welcome to Walcron Coorperation, Malaysia; a site was built for IT research purposes." key="fb_image_desc"/>
        <meta name="fb:admins" content="walcoorperation@gmail.com" key="fb_image_m"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" key="font"></link>
        <link rel="stylesheet" href="/css/font.css" key="internalfont"></link>
      </Head>
      <style jsx global>
      {`
        html {
          font-size: 12pt;
          min-width: 320px;
        }
        body {
          background: ${BACKGROUND};
          color: ${FOREGROUND};
          position: relative;
          padding: 0;
          margin: 0;
        }
      `}
      </style>
    </React.Fragment>
  );
}
