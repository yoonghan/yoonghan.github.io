import Card from "@/components/Card"
import { memo } from "react"
import styles from "../Projects.module.css"
import { site } from "@/config/site"

export const metadata = {
  title: "Microfrontend",
  description: "Microfrontend architecture.",
  alternates: {
    ...site.generateCanonical("/projects/microfrontend"),
  },
}

const Projects = ({}) => {
  const cards = [
    {
      id: "microfront-end-spa",
      title: "Microfrontend with Single Spa",
      description:
        "More comprehensive microfrontend with single spa. Way more complex compared to module federation.",
      href: "https://zelda.walcron.com/",
    },
    {
      id: "microfront-end-mf",
      title: "Microfrontend with Module Federation",
      description:
        "First experiment with microfrontend after attending courses based on Module Federation. Won't be updated.",
      href: "https://container.walcron.com/",
    },
  ]

  return (
    <div className={`${styles.container}`}>
      <div className="mx-auto max-w-screen-lg px-4 pb-8">
        <h1 className="text-2xl">Microfrontend</h1>
        <div>
          <p>
            Partially experimental but going forward, all written javascript
            projects are moved into Zelda.
          </p>
          <Card cards={cards} />
        </div>
      </div>
    </div>
  )
}

export default memo(Projects)
