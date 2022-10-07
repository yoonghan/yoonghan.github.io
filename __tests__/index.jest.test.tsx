import { render, screen, waitFor, within } from "@testing-library/react"
import Home, { getStaticProps } from "@/pages/index"
import userEvent from "@testing-library/user-event"
import { setCookie, deleteCookie } from "cookies-next"

describe("Home", () => {
  it("should render a construction site", () => {
    render(<Home termsRead={false} />)
    expect(
      screen.getByText("Currently we are under-construction")
    ).toBeInTheDocument()
    expect(screen.getAllByText("See our progress by visiting us at"))
    expect(
      screen.getAllByText(
        "If you are interested to talk to us, leave us your contact. Let us reach you instead."
      )
    )
  })

  it("should be able to click on the cookie button", async () => {
    const cookieText = "This site uses cookies."

    render(<Home termsRead={false} />)
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

  describe("getStaticProps", () => {
    it("should return termsRead as true when termsRead cookie exists", async () => {
      setCookie("termsRead", true)
      expect(await getStaticProps()).toStrictEqual({
        props: { termsRead: true },
      })
    })

    it("should return termsRead as false when termsRead cookie is missing", async () => {
      deleteCookie("termsRead")
      expect(await getStaticProps()).toStrictEqual({
        props: { termsRead: false },
      })
    })
  })
})
