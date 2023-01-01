import Table from "@/components/Table"

const Tables = (
  <div style={{ background: "#222" }}>
    <Table
      headers={["header one", "header two", "header three", "header four"]}
      list={[
        {
          "header one": "one",
          "header two": "one",
          "header three": "one",
          "header four": "one",
        },
        {
          "header one": "two",
          "header two": "two with a very ong message",
          "header three": <span>lorem ipsum tu la tu cove</span>,
          "header four": <span>two</span>,
        },
        {
          "header one": "three",
          "header two": "three",
          "header three": "three",
          "header four": "three",
        },
      ]}
    />
  </div>
)

export default Tables
