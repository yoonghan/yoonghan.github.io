type Props = {
  items: { title: string; component: React.ReactNode }[]
}

function StoryMaker({ items }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <section key={index}>
          <span title={item.title}>{item.title}</span>
          {item.component}
        </section>
      ))}
    </>
  )
}

export default StoryMaker
