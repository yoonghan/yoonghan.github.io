import styles from "./Card.module.css"

interface Props {
  cards: {
    id: string
    title: string
    description: string
    href: string
    target?: string
  }[]
}

const Card = ({ cards }: Props) => {
  return (
    <ul className={styles.container}>
      {cards.map(({ id, title, description, target, href }) => (
        <li key={id}>
          <a href={href} target={target || "blank"}>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Card
