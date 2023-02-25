import { render, within, screen } from "@testing-library/react"
import { CronJobCheckList, TroubleshootPwaCheckList } from "./Checklist"
import { setServiceNavigator } from "../../__mocks__/windowMock"

describe("Checklist", () => {
  describe("CronJobCheckList", () => {
    it("should render as inactive if post is missing", () => {
      render(<CronJobCheckList />)
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText("False")).toBeInTheDocument()
      expect(screen.getAllByText("N/A")).toHaveLength(2)
    })

    it("should render as active if post is there", () => {
      render(
        <CronJobCheckList
          postedJob={{
            jobName: "Test Cron Job",
            createdAt: "2022-02-11",
          }}
        />
      )
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText("2022-02-11")).toBeInTheDocument()
      expect(screen.getByText("True")).toBeInTheDocument()
      expect(screen.getByText("Test Cron Job")).toBeInTheDocument()
    })
  })

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
      expect(
        screen.getByText("Trusted Site App (N/R, query string issue)")
      ).toBeInTheDocument()
      expect(screen.getByText("Detected New Update (N/T)")).toBeInTheDocument()
      expect(screen.getByText("Update Installed (N/T)")).toBeInTheDocument()
      expect(screen.getByText("PWA run offline")).toBeInTheDocument()
    })

    it("should be able to set all service to true, except for twa", async () => {
      setServiceNavigator()
      render(<TroubleshootPwaCheckList />)
      expect(await screen.findAllByText("true")).toHaveLength(3)
      assertValue(screen.getByText("PWA Registered"), true)
      assertValue(screen.getByText("Detected New Update (N/T)"), true)
      assertValue(screen.getByText("Update Installed (N/T)"), true)
    })

    it("should be able to set twa to true", async () => {
      window.location.href = "?utm_source=launcher"
      render(<TroubleshootPwaCheckList />)
      expect(await screen.findAllByText("true")).toHaveLength(1)
      assertValue(
        screen.getByText("Trusted Site App (N/R, query string issue)"),
        true
      )
    })
  })
})
