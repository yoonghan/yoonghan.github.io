import { render, screen } from "@testing-library/react"
import NotFound from "@/app/not-found"
import { assertFooter } from "./utils/_footer"

describe("not found page", () => {
  it("should render not found page", async () => {
    render(<NotFound />)
    assertFooter()
    expect(screen.getByText("404"))
    expect(screen.getByText("This page is not found"))
  })
})
