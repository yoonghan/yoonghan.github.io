import { site } from "@/config/site"

export const metadata = {
  title: "Javascript free",
  description: "Playground for components that can work without Javascript.",
  alternates: {
    ...site.generateCanonical("/projects/javascript-free"),
  },
}

export default function JsFreedom({ children }: { children: React.ReactNode }) {
  return children
}
