import { render, screen, waitFor, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import HomePage from "./page"
import userEvent from "@testing-library/user-event"

describe("HomePage", () => {
  const renderComponent = () => {
    render(<HomePage />)
  }

  const assertSocialFab = async () => {
    expect(await screen.findByRole("link", { name: "git" })).toBeInTheDocument()
  }

  it("should have a social fab loaded", async () => {
    renderComponent()
    await assertSocialFab()
  })

  describe("able to navigate", () => {
    it("should have the following links", async () => {
      window.innerHeight = 500
      renderComponent()

      const navigation = within(
        screen.getByRole("navigation", {
          name: "Site Navigation",
        }),
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

      await userEvent.click(navigation.getByText("Test Driven Development"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 500)

      await userEvent.click(navigation.getByText("Going Live"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 3000)

      await userEvent.click(navigation.getByText("Github Pull Request"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 1000)

      await userEvent.click(navigation.getByText("Github Workflow"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 1500)

      await userEvent.click(navigation.getByText("Testing Deployment"))
      expect(scrollToFn).toHaveBeenNthCalledWith(5, 0, 2000)

      await userEvent.click(navigation.getByText("UI/UX Validation"))
      expect(scrollToFn).toHaveBeenNthCalledWith(6, 0, 2500)

      await userEvent.click(navigation.getByText("Periodic Security Checks"))
      expect(scrollToFn).toHaveBeenNthCalledWith(7, 0, 3500)

      await userEvent.click(navigation.getByText("Video About Us"))
      expect(scrollToFn).toHaveBeenNthCalledWith(8, 0, 4000)
    })

    it("should return to top once clicked or keyed", async () => {
      renderComponent()

      const scrollToFn = jest.fn()
      // eslint-disable-next-line testing-library/no-node-access
      const parallaxContainer = document.getElementById("parallax-container")
      if (parallaxContainer !== null) {
        parallaxContainer.scrollTo = scrollToFn
      }

      await userEvent.click(screen.getByText("Return to top"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 0)

      await userEvent.type(screen.getByText("Return to top"), "{enter}")
      expect(scrollToFn).toHaveBeenCalledWith(0, 0)
    })
  })
})
