import Menu from "@/components/MegaMenu"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Experiments",
  description: "Experimental pages for POC, and UI/UX",
}

export default function ExperimentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menu />
      {children}
      <Footer className="dark" />
    </>
  )
}
