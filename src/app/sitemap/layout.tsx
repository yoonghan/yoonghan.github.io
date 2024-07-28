import Footer from "@/components/Footer"

export const metadata = {
  title: "Sitemap",
  description: "Website links and site.",
}

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
