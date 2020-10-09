`use strict`

import * as React from "react";
import Head from 'next/head';

interface HtmlHeadProps {
  title: string;
  description: string;
  nofontawesome?: boolean;
  noBackground?: boolean;
}

export const HtmlHead:React.FC<HtmlHeadProps> = ({title, description, nofontawesome, noBackground}) => {
  return (
    <div id="id-scripts">
      <Head>
        <meta charSet="utf-8" key="charset"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" key="viewport"/>
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/pwa/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/pwa/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-icon-180x180.png" />
        <link rel="preload" as="style" href="/css/common.css" key="int_common" onLoad={"this.rel='stylesheet'" as any}/>
        <link rel="preload" as="style" href="/css/font.css" key="int_font" onLoad={"this.rel='stylesheet'" as any}/>
        {!nofontawesome && (<link rel="preload" as="style" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" onLoad={"this.rel='stylesheet'" as any}></link>)}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <style>{`
          html {
            scroll-behavior: smooth;
            min-width: 320px;
          }
          body {
            background: #000 ${noBackground?'none':'url(/img/bg/type1.jpg)'} no-repeat left bottom;
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156082636-1"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            if(location.hostname === "walcron.com") {
              location.href="//www.walcron.com";
            }`
          }}
          />
        <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'UA-156082636-1');
              `,
          }}
        />
      </Head>
    </div>
  );
}
