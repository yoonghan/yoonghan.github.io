import "@/styles/global.css"

export const metadata = {
  title: "Experiments",
  description: "Experimental pages for POC, and UI/UX",
}

export default function ExperimentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
