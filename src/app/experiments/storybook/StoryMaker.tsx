import styles from "./Storybook.module.css"

type Props = {
  items: { title: string; component: React.ReactNode }[]
}

function StoryMaker({ items }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <section key={index}>
          <h2 title={item.title}>{item.title}</h2>
          {item.component}
        </section>
      ))}
    </>
  )
}

export default StoryMaker
