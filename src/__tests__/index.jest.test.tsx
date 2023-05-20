import { render, screen, waitFor, within } from "@testing-library/react"
import "../__mocks__/routerMock"
import "../__mocks__/localStorageMock"
import Home from "@/app/homepage/main"
import UserEvent from "@testing-library/user-event"
import { assertFooter } from "./utils/_footer"
import { assertMenu } from "./utils/_menu"
import { assertSocialFab } from "./utils/_socialFab"

describe("Home", () => {
  const renderComponent = () => {
    render(<Home termsRead={false} />)
  }

  it("should have a menu and social fab loaded and footer", async () => {
    renderComponent()
    await assertMenu()
    await assertSocialFab()
    assertFooter()
  })

  it("should be able to click on the cookie button", async () => {
    const cookieText = "This site uses cookies."

    render(<Home termsRead={false} />)
    const cookieSection = screen.getByTestId("cookie-dialog")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    UserEvent.click(
      within(cookieSection).getByRole("button", { name: "Close" })
    )
    await waitFor(() => {
      expect(
        within(cookieSection).queryByText(cookieText)
      ).not.toBeInTheDocument()
    })
  })

  describe("able to navigate", () => {
    it("should have the following links", async () => {
      window.innerHeight = 500
      render(<Home termsRead={false} />)

      const navigation = within(
        screen.getByRole("navigation", {
          name: "Site Navigation",
        })
      )

      const scrollToFn = jest.fn()
      // eslint-disable-next-line testing-library/no-node-access
      const parallaxContainer = document.getElementById("parallax-container")
      if (parallaxContainer !== null) {
        parallaxContainer.scrollTo = scrollToFn
        jest
          .spyOn(parallaxContainer, "offsetHeight", "get")
          .mockReturnValue(500)
      }

      await UserEvent.click(navigation.getByText("Test Driven Development"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 500)

      await UserEvent.click(navigation.getByText("Going Live"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 3000)

      await UserEvent.click(navigation.getByText("Github Pull Request"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 1000)

      await UserEvent.click(navigation.getByText("Github Workflow"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 1500)

      await UserEvent.click(navigation.getByText("Testing Deployment"))
      expect(scrollToFn).toHaveBeenNthCalledWith(5, 0, 2000)

      await UserEvent.click(navigation.getByText("UI/UX Validation"))
      expect(scrollToFn).toHaveBeenNthCalledWith(6, 0, 2500)

      await UserEvent.click(navigation.getByText("Periodic Security Checks"))
      expect(scrollToFn).toHaveBeenNthCalledWith(7, 0, 3500)

      await UserEvent.click(navigation.getByText("Video About Us"))
      expect(scrollToFn).toHaveBeenNthCalledWith(8, 0, 4000)
    })

    it("should return to top once clicked or keyed", async () => {
      render(<Home termsRead={false} />)

      const scrollToFn = jest.fn()
      // eslint-disable-next-line testing-library/no-node-access
      const parallaxContainer = document.getElementById("parallax-container")
      if (parallaxContainer !== null) {
        parallaxContainer.scrollTo = scrollToFn
      }

      await UserEvent.click(screen.getByText("Return to top"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 0)

      await UserEvent.type(screen.getByText("Return to top"), "{enter}")
      expect(scrollToFn).toHaveBeenCalledWith(0, 0)
    })
  })
})
