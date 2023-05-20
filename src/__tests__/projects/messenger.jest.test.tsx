import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import { setEnv } from "../../__mocks__/apiMock"
import React from "react"
import Messenger from "@/app/projects/messenger/page"

describe("Messenger", () => {
  const renderComponent = () => render(<Messenger />)

  it("should show warning if none of the environment is set", () => {
    render(<Messenger />)
    expect(
      screen.getByText(
        "Pusher initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })
})
