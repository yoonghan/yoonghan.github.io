export const metadata = {
  title: "Checklist",
  description: "Important Checklist to ensure website runs well and good",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function SnakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
