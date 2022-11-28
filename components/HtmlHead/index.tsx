import * as React from "react"
import Head from "next/head"
import Script from "next/script"

const HtmlHead = ({
  description,
  title,
  isAmp = false,
}: {
  description: string
  title: string
  isAmp?: boolean
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" key="charset" />
        {!isAmp && (
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5"
            key="viewport"
          />
        )}
        <meta name="og:title" content="Walcron Coorperation" key="fb_title" />
        <meta name="og:type" content="profile" key="fb_type" />
        <meta
          name="og:site_name"
          content="https://www.walcron.com/"
          key="fb_charset"
        />
        <meta property="og:image:type" content="image/png" key="fb_image_t" />
        <meta property="og:image:width" content="400" key="fb_image_w" />
        <meta property="og:image:height" content="400" key="fb_image_h" />
        <meta
          name="og:image"
          content="https://www.walcron.com/og_image.png"
          key="fb_image_i"
        />
        <meta
          name="og:description"
          content="Welcome to Walcron Coorperation, Malaysia and Singapore; a site was built for IT research purposes."
          key="fb_image_desc"
        />
        <meta
          name="fb:admins"
          content="walcoorperation@gmail.com"
          key="fb_image_m"
        />
        <meta name="description" content={description} key="description" />
        <title>{title}</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/pwa/apple-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/pwa/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/pwa/apple-icon-180x180.png"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9V9VC8N5XT"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9V9VC8N5XT');
      `}
      </Script>
      <Script id="reroute-https" strategy="afterInteractive">
        {`if(location.hostname === "walcron.com") {
          location.href="//www.walcron.com";
        }`}
      </Script>
    </>
  )
}

export default HtmlHead
