import { site } from "@/config/site"

export const metadata = {
  title: "Messenger",
  description: "Chat and message anonymously, also to upload file if needed.",
  alternates: {
    ...site.generateCanonical("/projects/messenger"),
  },
}

export default function MessengerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
