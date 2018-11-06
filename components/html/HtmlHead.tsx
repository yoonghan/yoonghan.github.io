`use strict`

import * as React from "react";
import Head from 'next/head';

export const HtmlHead: React.SFC<any> = () => {
  return (
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
      <style jsx global>
      {`
        html {
          font-size: 12pt;
        }
        body {
          padding: 0;
          margin: 0;
        }
      `}
      </style>
    </Head>
  );
}
