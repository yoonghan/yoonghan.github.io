import Script from "next/script"
import { schema } from "./config/schema"

export const metadata = {
  title: "About Walcron",
  description:
    "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script type="application/ld+json" id="ld-json">
        {JSON.stringify(schema)}
      </Script>
      {children}
    </>
  )
}
