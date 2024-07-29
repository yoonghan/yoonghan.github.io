import Footer from "@/components/Footer"
import MegaMenu from "@/components/MegaMenu"
import "@/styles/global.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Metadata } from "next"
import Script from "next/script"

export { Body, metadata }

config.autoAddCss = false

const metadata: Metadata = {
  metadataBase: new URL("https://www.walcron.com"),
  title: "Walcron Coorperation",
  description:
    "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes.",
  applicationName: "Walcron",
  referrer: "origin-when-cross-origin",
  keywords: ["Walcron", "Prototyping", "Gladys"],
  authors: [{ name: "Yoong Han" }, { name: "Gladys Tai Lee Wan" }],
  openGraph: {
    title: "Walcron Coorperation",
    description:
      "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes.",
    url: "https://www.walcron.com/",
    siteName: "Walcron",
    images: [
      {
        url: "https://www.walcron.com/og_image.png",
        width: 400,
        height: 400,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/pwa/apple-icon.png",
  },
  manifest: "/manifest.json",
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <MegaMenu />
      </header>
      {children}
      <Footer className="dark" />
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9V9VC8N5XT"
        strategy="lazyOnload"
        id="google-tag"
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
      <body>
        <Body>{children}</Body>
      </body>
    </html>
  )
}
