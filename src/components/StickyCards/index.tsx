import { ScrollableCard } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import styles from "./scrollable.module.css"
import { ReactNode } from "react"
import Link from "../Link"
import Image from "next/image"

interface Content {
  imageUrl?: string
  title: string
  className: string
  description?: ReactNode
  href?: string
}

function StickyCards({ contents }: { contents: Content[] }) {
  return (
    <ScrollableCard
      isReversed={true}
      model={contents.map(
        ({ imageUrl, className, title, description, href }) => ({
          content: (
            <div className={className}>
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} height={150} width={150} alt="cert" />
              )}
              <div className="text-4xl pb-4">{title}</div>
              {description && <div className="pb-8">{description}</div>}
              {href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black"
                  prefetch={false}
                >
                  View{" "}
                  <Image
                    alt="Arrow icon"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' class='w-3 inline'%3E%3Cpath d='M15.5 8C15.5 8.29 15.38 8.56 15.16 8.75L7.16 15.75L5.84 14.24L11.84 8.99H0.5V6.99H11.84L5.84 1.76L7.16 0.25L15.16 7.25C15.38 7.44 15.5 7.71 15.5 8Z' data-type='fill'/%3E%3C/svg%3E"
                    width={12}
                    height={12}
                    className="inline"
                  />
                </Link>
              )}
            </div>
          ),
        })
      )}
      className={styles.container}
    ></ScrollableCard>
  )
}

export default StickyCards
