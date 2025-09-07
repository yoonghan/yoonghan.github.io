import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PwaEnabler from "."
import {
  setServiceNavigator,
  spyAsIPad,
  spyAsAndroid,
  spyOnReferrer,
} from "@/__tests__/mocks/windowMock"

describe("PwaEnabler", () => {
  const renderComponent = (onCancel = jest.fn()) =>
    render(<PwaEnabler onCancel={onCancel} />)

  it("should render correctly with PWA disabled", () => {
    renderComponent()
    expect(screen.getByText("Progressive Web App")).toBeInTheDocument()
    expect(screen.getByText("Disabled")).toBeInTheDocument()
  })

  it("should render correctly with PWA disabled", async () => {
    const closeFn = jest.fn()
    renderComponent(closeFn)
    await userEvent.click(screen.getByText("[ESC]"))
    expect(closeFn).toHaveBeenCalled()
  })

  describe("TWA enabled", () => {
    it("should inform if app is TWA enabled", () => {
      spyOnReferrer("android-app://com.walcron.web")
      renderComponent()
      expect(
        screen.getByText(
          "Trusted Web Application is detected, pwa is ENABLED.",
        ),
      )
    })
  })

  describe("With Service Navigator", () => {
    //Note setServiceNavigator must ran last as once setup it affects entire test suite.
    beforeAll(() => {
      setServiceNavigator()
    })

    it("should render correctly with PWA enabled once loaded when installed", async () => {
      renderComponent()
      expect(screen.getByText("Progressive Web App")).toBeInTheDocument()
      expect(screen.getByText("Disabled")).toBeInTheDocument()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
    })

    it("should be able to toggle PWA to disabled when service is installed", async () => {
      renderComponent()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
      await userEvent.click(screen.getByRole("checkbox", { name: "Installed" }))
      expect(await screen.findByText("Processing")).toBeInTheDocument()
      expect(
        await screen.findByText("Disabled", undefined, {
          timeout: 2000,
          interval: 500,
        }),
      ).toBeInTheDocument()
      await userEvent.click(screen.getByRole("checkbox", { name: "Disabled" }))
      expect(await screen.findByText("Processing")).toBeInTheDocument()
      expect(
        await screen.findByText("Installed", undefined, {
          timeout: 2000,
          interval: 500,
        }),
      ).toBeInTheDocument()
    })

    it("should show special message for safari users when installed", async () => {
      spyAsIPad()
      renderComponent()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
      expect(
        screen.getByText("For Safari mobile users, follow these steps."),
      ).toBeInTheDocument()
    })

    it("should show a button for android download for android users when installed", async () => {
      spyAsAndroid()
      renderComponent()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
      expect(screen.getByText("Playstore Download")).toBeInTheDocument()
    })
  })
})
