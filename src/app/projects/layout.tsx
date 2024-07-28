import Footer from "@/components/Footer"

export const metadata = {
  title: "Projects",
  description: "Playground projects that we had been working on.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Footer className="dark" />
    </>
  )
}
