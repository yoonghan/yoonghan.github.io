import "@/styles/global.css"

export const metadata = {
  title: "Walcron History",
  description: "Site history and External knowledge and things I worked on.",
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
