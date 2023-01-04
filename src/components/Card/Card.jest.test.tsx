import { render, screen } from "@testing-library/react"
import Card from "."

describe("Card", () => {
  it("should display cards correctly", () => {
    render(
      <Card
        cards={[
          {
            id: "title1",
            title: "Title one",
            description: "Description one",
            href: "Href one",
          },
          {
            id: "title2",
            title: "Title two",
            description: "Description two",
            href: "Href two",
            target: "_self",
          },
        ]}
      />
    )
    const linkOne = screen.getByRole("link", {
      name: "Title one Description one",
    })
    expect(linkOne).toHaveAttribute("href", "Href one")
    expect(linkOne).toHaveAttribute("target", "blank")

    const linkTwo = screen.getByRole("link", {
      name: "Title two Description two",
    })
    expect(linkTwo).toHaveAttribute("href", "Href two")
    expect(linkTwo).toHaveAttribute("target", "_self")
  })
})
