import { render, screen, within } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import Navigator from "."

describe("Navigator", () => {
  const links = [
    {
      id: "1",
      desc: "Hello a long desc",
      link: "link1",
    },
    {
      id: "2",
      desc: "Another desc",
      link: "link2",
    },
  ]

  it("should have 2 groups", () => {
    render(
      <Navigator links={links} onLinkClick={jest.fn()} label="Site Name" />,
    )
    expect(
      screen.getByRole("navigation", { name: "Site Name" }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("menuitem")).toHaveLength(2)
  })

  it("should render timeline correctly", () => {
    render(<Navigator links={links} onLinkClick={jest.fn()} label="Site" />)

    expect(screen.getByText("Site Map:")).toBeInTheDocument()

    const groupId1 = within(screen.getAllByRole("menuitem")[0])
    expect(groupId1.getByText("Hello a long desc")).toBeInTheDocument()

    const groupId2 = within(screen.getAllByRole("menuitem")[1])
    expect(groupId2.getByText("Another desc")).toBeInTheDocument()
  })

  it("should user is able to click or keyenter on the links", async () => {
    const linkFn = jest.fn()
    render(<Navigator links={links} onLinkClick={linkFn} label="Site" />)

    await UserEvent.click(screen.getAllByRole("menuitem")[0])
    expect(linkFn).toBeCalledWith("link1")

    await UserEvent.type(screen.getAllByRole("menuitem")[1], "{enter}")
    expect(linkFn).toBeCalledWith("link2")
  })
})
