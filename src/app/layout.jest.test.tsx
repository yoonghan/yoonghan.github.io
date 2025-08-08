import { render, screen, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import { Body } from "./layout"
import userEvent from "@testing-library/user-event"

describe("Main Layout", () => {
  const renderComponent = () => {
    render(
      <Body>
        <>Sample</>
      </Body>,
    )
  }

  beforeEach(() => {
    // Mock the performance object before each test
    Object.defineProperty(window, "performance", {
      value: {
        getEntries: jest.fn(() => [
          {
            name: "my-mark-1",
            entryType: "mark",
            startTime: 100,
            duration: 0,
          },
          {
            name: "my-measure-1",
            entryType: "measure",
            startTime: 100,
            duration: 50,
          },
        ]),
        getEntriesByType: jest.fn((type) => {
          if (type === "mark") {
            return [
              {
                name: "my-mark-1",
                entryType: "mark",
                startTime: 100,
                duration: 0,
              },
            ]
          }
          return []
        }),
        mark: jest.fn(),
        measure: jest.fn(),
        // Add other performance methods if needed
      },
      writable: true, // Make it writable for mocking
    })
  })

  afterEach(() => {
    // Clean up the mock after each test
    jest.restoreAllMocks()
  })

  const assertFooter = () => {
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).getByText("Walcron 2014-2025 ©")).toBeInTheDocument()
  }

  const assertMenu = async () => {
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(await screen.findAllByText("walcron$")).toHaveLength(2)
  }

  it("should have a Mega Menu", async () => {
    renderComponent()
    await assertMenu()
    assertFooter()
    expect(screen.getByText("Sample")).toBeInTheDocument()
  })

  it("should be able to load and accept cookie", async () => {
    const cookieText = "This site uses cookies."

    renderComponent()
    const cookieSection = await screen.findByTestId("cookie-dialog")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    await userEvent.click(
      within(cookieSection).getByRole("button", { name: "Accept" }),
    )
    expect(
      within(cookieSection).queryByText(cookieText),
    ).not.toBeInTheDocument()
  })
})
