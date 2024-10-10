import "@/__tests__/mocks/fetchMock"
import {
  render,
  within,
  screen,
  getDefaultNormalizer,
} from "@testing-library/react"
import { CronJobCheckList, TroubleshootPwaCheckList } from "./Checklist"
import { setServiceNavigator } from "@/__tests__/mocks/windowMock"
import userEvent from "@testing-library/user-event"
import { fetchMock } from "@/__tests__/mocks/fetchMock"

describe("Checklist", () => {
  describe("CronJobCheckList", () => {
    it("should render as inactive if post is missing", () => {
      render(<CronJobCheckList />)
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText("False")).toBeInTheDocument()
    })

    it("should render as inactive if post is not found", () => {
      render(<CronJobCheckList latestDeployedCronMessage="Not Found" />)
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(screen.getByText("False")).toBeInTheDocument()
      expect(screen.getByText("Cron execution pending")).toBeInTheDocument()
    })

    it("should render as active if post is there", async () => {
      const result = "2024-12-12T01:01:01.293Z"
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: result,
          }),
      })
      render(
        <CronJobCheckList
          latestDeployedCronMessage={result}
          queryTodayCron={true}
        />
      )
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(
        within(screen.getByTestId("result Since Deployment")).getByText("True")
      ).toBeInTheDocument()
      expect(
        await within(screen.getByTestId("message Since Deployment")).findByText(
          "12/12/2024"
        )
      ).toBeInTheDocument()
      expect(
        await within(screen.getByTestId("message Today's Run")).findByText(
          "12/12/2024"
        )
      ).toBeInTheDocument()
    })

    it("should hide View More button after click and display table", async () => {
      fetchMock.mockResolvedValue({
        json: () => Promise.resolve(undefined),
      })
      const date = new Date()
      render(
        <CronJobCheckList latestDeployedCronMessage="2024-09-01T01:01:01.293Z" />
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" })
      ).not.toBeInTheDocument()
      expect(fetchMock).toHaveBeenCalledWith("/api/cron", undefined)
    })

    it("should hide View More button and show error", async () => {
      fetchMock.mockResolvedValue({
        json: () => Promise.resolve([]),
      })
      const date = new Date()
      render(
        <CronJobCheckList latestDeployedCronMessage="2024-09-01T01:01:01.293Z" />
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" })
      ).not.toBeInTheDocument()
      expect(
        screen.getByText("Fetch to /api/cron failed, try again later")
      ).toBeInTheDocument()
    })

    it("should show loading history", async () => {
      fetchMock.mockResolvedValue(new Promise(() => {}))
      const date = new Date()
      render(
        <CronJobCheckList latestDeployedCronMessage="2024-09-01T01:01:01.293Z" />
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" })
      ).not.toBeInTheDocument()
      expect(screen.getByText("Loading data...")).toBeInTheDocument()
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
