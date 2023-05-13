import "@/styles/global.css"

export const metadata = {
  title: "Walcron Coorperation",
  description:
    "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes.",
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
