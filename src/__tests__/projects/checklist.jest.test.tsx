import { prismaMock } from "../../__mocks__/prismaMock"
import "../../__mocks__/routerMock"
import { setEnv } from "../../__mocks__/apiMock"
import { render, screen } from "@testing-library/react"
import Checklist from "@/app/projects/checklist/page"
import { getPostedCronJob } from "@/app/projects/checklist/util"
import { assertScrollToTop } from "../utils/_scrollToTop"
import { CronJob } from "@prisma/client"

describe("Checklist", () => {
  const renderComponent = async () => {
    render(<Checklist />)
  }

  it("should render the page with the important components", async () => {
    renderComponent()
    await assertScrollToTop()
    expect(screen.getByText("Important Checklist Links"))
    expect(screen.getByText("PWA"))
    expect(screen.getByText("CronJob"))
  })

  describe("prisma/db connection", () => {
    beforeEach(() => {
      setEnv({
        DATABASE_URL: "mysql://somevalidurl",
      })
    })

    const postedCronJob: CronJob = {
      createdAt: new Date(),
      jobName: "Test Cron Job",
      id: 1,
    }

    it("should be able to return post with createAt as descending order", async () => {
      const mockFn = prismaMock.cronJob.findFirst
      mockFn.mockResolvedValue(postedCronJob)
      const response = await getPostedCronJob()
      const { id, ...resultWithoutId } = postedCronJob
      expect(response).toStrictEqual({
        ...resultWithoutId,
        createdAt: postedCronJob.createdAt.toISOString(),
      })
      expect(mockFn).toBeCalledWith({ orderBy: { createdAt: "desc" } })
    })

    it("should be able to handle if post returned are empty", async () => {
      prismaMock.cronJob.findFirst.mockResolvedValue(null)
      const response = await getPostedCronJob()
      expect(response).toStrictEqual(undefined)
    })
  })
})
