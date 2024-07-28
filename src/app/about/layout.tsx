import Menu from "@/components/MegaMenu"
import Footer from "@/components/Footer"
import Script from "next/script"

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
  const _getSchema = () => {
    const schemas = {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      name: "Walcron",
      image: "https://walcron.com/img/logo/logo-color.svg",
      email: "walcoorperation@gmail.com",
      url: "https://www.walcron.com/",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: {
          "@type": "DayOfWeek",
          name: "Monday-Sunday",
        },
        opens: "2014-07-04T9:00",
        closes: "2020-07-04T9:00",
      },
    }
    return JSON.stringify(schemas)
  }

  return (
    <>
      <Script type="application/ld+json" id="ld-json">
        {_getSchema()}
      </Script>
      <Menu />
      {children}
      <Footer />
    </>
  )
}
