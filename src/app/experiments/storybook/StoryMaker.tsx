type Props = {
  items: { title: string; component: React.ReactNode }[]
}

function StoryMaker({ items }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <div
            title={item.title}
            className={"px-4 py-2 text-white bg-black w-full mt-16"}
          >
            {item.title}
          </div>
          {item.component}
        </div>
      ))}
    </>
  )
}

export default StoryMaker
