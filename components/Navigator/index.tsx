import { useMemo } from "react"
import styles from "./Navigator.module.css"

interface Props {
  label: string
  links: Array<ILink>
  onLinkClick: (link: string) => void
}

interface ILink {
  id: string
  desc: string
  link: string
}

const Navigator = ({ links, onLinkClick, label }: Props) => {
  const createLinks = useMemo(() => {
    return links.map(({ id, desc, link }, idx) => (
      <li
        className={styles.container}
        key={`navigator_${id}`}
        onClick={() => onLinkClick(link)}
      >
        <span></span>
        <span>
          <i className={styles.dot}></i>
        </span>
        <div className={styles.content}>
          <p>{desc}</p>
        </div>
      </li>
    ))
  }, [links, onLinkClick])

  return (
    <div>
      <span className={styles.sitemap}>Site Map:</span>
      <nav aria-label={label}>
        <ul className={styles.mainContainer}>{createLinks}</ul>
      </nav>
    </div>
  )
}

export default Navigator
