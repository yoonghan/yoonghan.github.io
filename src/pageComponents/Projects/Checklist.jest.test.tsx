import "../../__mocks__/fetchMock"
import { render, within, screen } from "@testing-library/react"
import { CronJobCheckList, TroubleshootPwaCheckList } from "./Checklist"
import { setServiceNavigator } from "../../__mocks__/windowMock"
import userEvent from "@testing-library/user-event"
import { fetchMock } from "../../__mocks__/fetchMock"

describe("Checklist", () => {
  describe("CronJobCheckList", () => {
    it("should render as inactive if post is missing", () => {
      render(<CronJobCheckList />)
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText("False")).toBeInTheDocument()
      expect(screen.getAllByText("N/A")).toHaveLength(2)
    })

    it("should render as active if post is there", () => {
      const date = new Date()
      render(
        <CronJobCheckList
          postedJob={{
            jobName: "Test Cron Job",
            createdAt: date.toISOString(),
          }}
        />
      )
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText(date.toLocaleString())).toBeInTheDocument()
      expect(screen.getByText("True")).toBeInTheDocument()
      expect(screen.getByText("Test Cron Job")).toBeInTheDocument()
    })

    it("should hide View More button after click and display table", async () => {
      fetchMock.mockResolvedValue({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              createdAt: "2023-02-25T09:57:37.271Z",
              jobName: "Written from cron job",
            },
            {
              id: 2,
              createdAt: "2023-02-25T10:10:54.125Z",
              jobName: "Written from cron job",
            },
          ]),
      })
      const date = new Date()
      render(
        <CronJobCheckList
          postedJob={{
            jobName: "Test Cron Job",
            createdAt: date.toISOString(),
          }}
        />
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" })
      ).not.toBeInTheDocument()
      expect(screen.getByText("Job Created At")).toBeInTheDocument()
      expect(screen.getByText("Job Name")).toBeInTheDocument()
      expect(screen.getAllByText("Written from cron job")).toHaveLength(2)
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
