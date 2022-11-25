import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import PwaEnabler from "."
import {
  setServiceNavigator,
  spyAsIPad,
  spyOnReferrer,
} from "../../../__mocks__/windowMock"

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
    await UserEvent.click(screen.getByText("[ESC]"))
    expect(closeFn).toHaveBeenCalled()
  })

  describe("TWA enabled", () => {
    it("should inform if app is TWA enabled", () => {
      spyOnReferrer("android-app://com.walcron.web")
      renderComponent()
      expect(
        screen.getByText("Trusted Web Application is detected, pwa is ENABLED.")
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
      jest.spyOn(console, "log").mockImplementation(() => {})
      renderComponent()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
      await UserEvent.click(screen.getByText("Installed"))
      expect(await screen.findByText("Processing")).toBeInTheDocument()
      expect(
        await screen.findByText("Disabled", undefined, {
          timeout: 2000,
          interval: 500,
        })
      ).toBeInTheDocument()
      await UserEvent.click(screen.getByText("Disabled"))
      expect(await screen.findByText("Processing")).toBeInTheDocument()
      expect(
        await screen.findByText("Installed", undefined, {
          timeout: 2000,
          interval: 500,
        })
      ).toBeInTheDocument()
    })

    it("should show special message for safari users when installed", async () => {
      spyAsIPad()
      renderComponent()
      expect(await screen.findByText("Installed")).toBeInTheDocument()
      expect(screen.getByText("For Safari mobile users, follow these steps."))
    })
  })
})
