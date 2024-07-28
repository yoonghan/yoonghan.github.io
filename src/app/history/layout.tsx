import Footer from "@/components/Footer"

export const metadata = {
  title: "Website History",
  description: "Timeline and journey of the page.",
}

export default function HistoryLayout({
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
