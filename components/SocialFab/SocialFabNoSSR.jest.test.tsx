import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import SocialFabNoSSR from "./SocialFabNoSSR"
import "../../__mocks__/windowMock"

describe("SocialFabNoSSR", () => {
  const assertLinkIsCorrect = (selector: HTMLElement, link: string) => {
    expect(selector).toHaveAttribute("href", link)
    expect(selector).toHaveAttribute("target", "onnew")
  }

  it("should show component correctly", () => {
    render(<SocialFabNoSSR />)
    assertLinkIsCorrect(
      screen.getByRole("link", { name: "linkedIn" }),
      "//www.linkedin.com/in/han-yoong-33755361/"
    )

    assertLinkIsCorrect(
      screen.getByRole("link", { name: "git" }),
      "//github.com/yoonghan/Walcron"
    )

    assertLinkIsCorrect(
      screen.getByRole("link", { name: "stackoverflow" }),
      "//stackoverflow.com/users/3893990/han"
    )

    assertLinkIsCorrect(
      screen.getByRole("link", { name: "facebook" }),
      "//www.facebook.com/walcron"
    )

    expect(screen.getByRole("button", { name: "gmail" })).toBeInTheDocument()
  })

  it("should show letterbox dialog if email button is pressed", async () => {
    render(<SocialFabNoSSR />)
    await UserEvent.click(screen.getByRole("button", { name: "gmail" }))
    expect(screen.getByRole("modal")).toBeInTheDocument()

    await UserEvent.click(screen.getByRole("button", { name: "[ESC]" }))
    expect(screen.queryByRole("modal")).not.toBeInTheDocument()
  })
})
