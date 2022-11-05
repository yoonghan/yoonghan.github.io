import { render, screen, waitFor, within } from "@testing-library/react"
import Home, { getServerSideProps } from "@/pages/index"
import UserEvent from "@testing-library/user-event"
import { NextPageContext } from "next"
import { setCookie, deleteCookie } from "cookies-next"

jest.mock("next/router", () => require("next-router-mock"))

describe("Home", () => {
  const renderComponent = async () => {
    render(<Home termsRead={false} />)
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should be able to click on the cookie button", async () => {
    const cookieText = "This site uses cookies."

    await render(<Home termsRead={false} />)
    const cookieSection = screen.getByRole("cookie")
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

  describe("getServerSideProps", () => {
    let nextPageContext = {} as NextPageContext

    it("should return termsRead as true when termsRead cookie exists", async () => {
      setCookie("termsRead", true, nextPageContext)
      expect(await getServerSideProps(nextPageContext)).toStrictEqual({
        props: { termsRead: true },
      })
    })

    it("should return termsRead as false when termsRead cookie is missing", async () => {
      deleteCookie("termsRead", nextPageContext)
      expect(await getServerSideProps(nextPageContext)).toStrictEqual({
        props: { termsRead: false },
      })
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
      expect(scrollToFn).toHaveBeenCalledWith(0, 2000)

      await UserEvent.click(navigation.getByText("UI/UX Validation"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 2500)

      await UserEvent.click(navigation.getByText("Contact Us"))
      expect(scrollToFn).toHaveBeenCalledWith(0, 3500)
    })
  })
})
