import Footer from "@/components/Footer"
import { GoogleAnalytic } from "@/components/GoogleAnalytic"
import MegaMenu from "@/components/MegaMenu"
import { site } from "@/config/site"
import "@/styles/global.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Metadata } from "next"
import Script from "next/script"

export { Body, metadata }

config.autoAddCss = false

const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    url: site.url,
    siteName: "Walcron",
    images: [
      {
        url: `${site.defaultUrl}/og_image.png`,
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
  alternates: {
    ...site.generateCanonical(""),
  },
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <MegaMenu />
      </header>
      <main className={"min-h-screen"}>{children}</main>
      <Footer />
      <GoogleAnalytic ga4Id={site.ga4Id} />
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script id="reroute-https" strategy="afterInteractive">
        {`if(location.hostname === "walcron.com") {
          location.href="${site.defaultUrl}";
        }`}
      </Script>
      <body>
        <Body>{children}</Body>
      </body>
    </html>
  )
}
