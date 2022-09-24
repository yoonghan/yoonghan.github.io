import { render, screen, waitFor, within } from "@testing-library/react"
import Home, { getServerSideProps } from "@/pages/index"
import userEvent from "@testing-library/user-event"
import { NextPageContext } from "next"
import type { IncomingMessage, ServerResponse } from "http"
import { setCookie, deleteCookie } from "cookies-next"

describe("Home", () => {
  it("should render a construction site", () => {
    render(<Home termsRead="false" />)
    expect(
      screen.getByText("Currently we are under-construction")
    ).toBeInTheDocument()
  })

  it("should be able to click on the cookie button", async () => {
    const cookieText = "This site uses cookies."

    render(<Home termsRead="false" />)
    const cookieSection = screen.getByRole("cookie")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    userEvent.click(
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
      setCookie("termsRead", "true", nextPageContext)
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
})
