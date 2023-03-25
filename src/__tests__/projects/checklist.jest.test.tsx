import { prismaMock } from "../../__mocks__/prismaMock"
import "../../__mocks__/routerMock"
import { render, screen, fireEvent } from "@testing-library/react"
import Checklist, { config } from "@/pages/projects/checklist"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { assertScrollToTop } from "../utils/_scrollToTop"
import { CronJob } from "@prisma/client"
import { getServerSideProps } from "@/pages/projects/checklist"

describe("Checklist links", () => {
  const renderComponent = () => {
    render(<Checklist />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("Important Checklist Links"))
    expect(screen.getByText("PWA"))
    expect(screen.getByText("CronJob"))
  })

  it("should be able to scroll up", () => {
    renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })

  it("should expose config with runtime set to nodejs as edge will not work", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })

  describe("prisma/db connection", () => {
    const postedCronJob: CronJob = {
      createdAt: new Date(),
      jobName: "Test Cron Job",
      id: 1,
    }

    it("should be able to return post with createAt as descending order", async () => {
      const mockFn = prismaMock.cronJob.findFirst
      mockFn.mockResolvedValue(postedCronJob)
      const response = await getServerSideProps()
      const { id, ...resultWithoutId } = postedCronJob
      expect(response).toStrictEqual({
        props: {
          postedCronJob: {
            ...resultWithoutId,
            createdAt: postedCronJob.createdAt.toISOString(),
          },
        },
      })
      expect(mockFn).toBeCalledWith({ orderBy: { createdAt: "desc" } })
    })

    it("should be able to handle if post returned are empty", async () => {
      prismaMock.cronJob.findFirst.mockResolvedValue(null)
      const response = await getServerSideProps()
      expect(response).toStrictEqual({
        props: {
          postedCronJob: undefined,
        },
      })
    })
  })
})
