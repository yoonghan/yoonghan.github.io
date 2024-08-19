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
            <section>
              <h3>{title}</h3>
              <div>
                <hr className="pb-2" />
                {description}
              </div>
            </section>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Card
