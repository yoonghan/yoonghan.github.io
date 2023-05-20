import "@/styles/global.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Metadata } from "next"
config.autoAddCss = false

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
