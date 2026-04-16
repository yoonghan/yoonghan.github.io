import "@/__tests__/mocks/fetchMock"
import {
  render,
  within,
  screen,
  getDefaultNormalizer,
} from "@testing-library/react"
import { CronJobCheckList } from "./Checklist"
import { setServiceNavigator } from "@/__tests__/mocks/windowMock"
import userEvent from "@testing-library/user-event"
import { fetchMock } from "@/__tests__/mocks/fetchMock"
import { SWRConfig } from "swr"

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

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: result,
          }),
      })
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve([{
            id: '1',
            method: 'GET',
            source: 'cron',
            createdAt: "2026-12-12T01:01:01.293Z"
          }]),
      })
      render(
        <SWRConfig value={{
          provider: () => new Map(),
          dedupingInterval: 0
        }}>
          < CronJobCheckList
            latestDeployedCronMessage={result}
            queryTodayCron={true}
          />
        </SWRConfig>,
      )
      expect(screen.getByText("CronJob")).toBeInTheDocument()
      expect(
        within(screen.getByTestId("result Since Deployment")).getByText("True"),
      ).toBeInTheDocument()
      expect(
        await within(screen.getByTestId("message Since Deployment")).findByText(
          "12/12/2024",
        ),
      ).toBeInTheDocument()
      expect(
        await within(screen.getByTestId("message Today's Run")).findByText(
          "12/12/2024",
        ),
      ).toBeInTheDocument()
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(await screen.findByText("cron")).toBeInTheDocument()
      expect(screen.getByText(/^12\/12\/2026, .*/)).toBeInTheDocument()
    })

    it("should hide View More button and show error", async () => {
      fetchMock.mockRejectedValueOnce({
        json: () => Promise.reject([]),
      })
      const date = new Date()
      render(
        <CronJobCheckList latestDeployedCronMessage="2024-09-01T01:01:01.293Z" />,
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" }),
      ).not.toBeInTheDocument()
      expect(
        screen.getByText("Fetch to /api/cron failed, try again later"),
      ).toBeInTheDocument()
    })

    it("should show loading history", async () => {
      fetchMock.mockResolvedValue({
        json: () => Promise.resolve(undefined),
      })
      const date = new Date()
      render(
        <CronJobCheckList latestDeployedCronMessage="2024-09-01T01:01:01.293Z" />,
      )
      await userEvent.click(screen.getByRole("button", { name: "View More" }))
      expect(
        screen.queryByRole("button", { name: "View More" }),
      ).not.toBeInTheDocument()
      expect(screen.getByText("Loading data...")).toBeInTheDocument()
    })
  })
})
