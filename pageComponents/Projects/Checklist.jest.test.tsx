import { render, within, screen } from "@testing-library/react"
import TroubleshootPwaCheckList from "./Checklist"
import { setServiceNavigator } from "../../__mocks__/windowMock"

describe("Checklist", () => {
  describe("TroubleshootPwaCheckList", () => {
    const assertValue = (component: HTMLElement, value: boolean) => {
      // eslint-disable-next-line testing-library/no-node-access
      const trElem = component.parentElement
      expect(trElem).not.toBeNull
      if (trElem !== null)
        expect(within(trElem).getByText(value ? "true" : "false"))
    }

    it("should render correctly", () => {
      render(<TroubleshootPwaCheckList />)
      expect(screen.getByText("PWA Registered")).toBeInTheDocument()
      expect(screen.getByText("Trusted Site App")).toBeInTheDocument()
      expect(screen.getByText("Detected New Update?")).toBeInTheDocument()
      expect(screen.getByText("Update Installed?")).toBeInTheDocument()
    })

    it("should be able to set all service to true, except for twa", async () => {
      setServiceNavigator()
      render(<TroubleshootPwaCheckList />)
      expect(await screen.findAllByText("true")).toHaveLength(3)
      assertValue(screen.getByText("PWA Registered"), true)
      assertValue(screen.getByText("Detected New Update?"), true)
      assertValue(screen.getByText("Update Installed?"), true)
    })

    it("should be able to set twa to true", async () => {
      window.location.href = "?utm_source=launcher"
      render(<TroubleshootPwaCheckList />)
      expect(await screen.findAllByText("true")).toHaveLength(1)
      assertValue(screen.getByText("Trusted Site App"), true)
    })
  })
})
