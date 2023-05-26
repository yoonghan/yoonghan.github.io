import ScrollableList from "@/components/ScrollableList"

const items = Array(1000)
  .fill(0)
  .map((_key, index) => ({ id: `${index}`, content: <div>I am {index}</div> }))

const ScrollableListDemo = () => (
  <div>
    <ScrollableList listItems={items} maxItemsToRender={50} />
  </div>
)

export default ScrollableListDemo
