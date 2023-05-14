import { render, screen, within } from "@testing-library/react"
import Timeline from "."
import { faArrows } from "@fortawesome/free-solid-svg-icons"

describe("Timeline", () => {
  const events = [
    {
      id: "1",
      date: "2022-02-11",
      desc: "desc",
    },
    {
      id: "2",
      date: "2022-09-11",
      special: "fix issue",
      desc: "issue desc",
      faIcon: faArrows,
    },
  ]

  it("should have 2 groups", () => {
    render(<Timeline events={events} />)
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })

  it("should render timeline correctly", () => {
    render(<Timeline events={events} />)

    const groupId1 = within(screen.getAllByRole("listitem")[0])
    expect(groupId1.getByText("2022-02-11")).toBeInTheDocument()
    expect(groupId1.getByText("desc")).toBeInTheDocument()

    const groupId2 = within(screen.getAllByRole("listitem")[1])
    expect(groupId2.getByText("2022-09-11")).toBeInTheDocument()
    expect(groupId2.getByText("[fix issue]")).toBeInTheDocument()
    expect(groupId2.getByText("issue desc")).toBeInTheDocument()
  })

  it("should render with fontawesome icons", () => {
    const getFaIcon = (selector: HTMLElement) => {
      // eslint-disable-next-line testing-library/no-node-access
      const spanElements = selector.querySelectorAll("span")

      expect(spanElements).toHaveLength(2)

      // eslint-disable-next-line testing-library/no-node-access
      return spanElements[1]?.children[0]
    }

    render(<Timeline events={events} />)

    const timeline1 = screen.getAllByRole("listitem")[0]
    expect(getFaIcon(timeline1)).toHaveClass("dot")

    const timeline2 = screen.getAllByRole("listitem")[1]
    expect(getFaIcon(timeline2)).toHaveClass("icon")
  })
})
