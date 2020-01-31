`use strict`

import * as React from "react";
import Head from 'next/head';
import "../ModernizerTest";

interface HtmlHeadProps {
  title: string;
  description: string;
  nofontawesome?: boolean;
}

export const HtmlHead:React.FC<HtmlHeadProps> = (props:HtmlHeadProps) => {
  const _runPreload = () => {
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

  React.useEffect(() => {
    setTimeout(_runPreload, 50);
  },[]);

  const {title, description, nofontawesome} = props;
  return (
    <div id="id-scripts">
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
        <style>{`
          .webp body {
            background-image: url(/static/img/bg/type1.webp);
          }
          .no-webp body {
            background-image: url(/static/img/bg/type1.jpg);
          }
          body {
            background: #000 none no-repeat left bottom;
            background-size: contain;
            color: #FFF;
            position: relative;
            padding: 0;
            margin: 0;
            min-height: 100vh;
            width: 100%;
            min-width: 320px;
          }
          div.mr-item {
            width: 200px;
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
          }
          footer {
            font-size: 0.8rem;
            bottom: 0px;
            left: 0px;
            margin: 10px;
            position: absolute;
            width: 320px;
          }
        `}</style>
      </Head>
    </div>
  );
}
