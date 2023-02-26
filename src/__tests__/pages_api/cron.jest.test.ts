import "../../__mocks__/fetchMock"
import { prismaMock } from "../../__mocks__/prismaMock"
import { mockResponse, NextApiRequestMock } from "../../__mocks__/apiMock"
import { config } from "@/pages/api/cron"
import { execute } from "@/pages/api/cron/_cron"

describe("cron", () => {
  describe("with execute module", () => {
    it("should return an OK when data can be tracked", async () => {
      prismaMock.cronJob.create.mockResolvedValue({
        id: 1,
        jobName: "Test CronJob",
        createdAt: new Date(),
      })
      const response = await execute()
      expect(response.status).toBe(200)
      expect(await response.json()).toStrictEqual({
        message: "Posted a cron job",
      })
    })

    const assertFailCases = async (
      error: Error | string,
      expectedErrorMessage: string
    ) => {
      prismaMock.cronJob.create.mockRejectedValue(error)
      const response = await execute()
      expect(response.status).toBe(500)
      expect(await response.json()).toStrictEqual({
        message: "Fail to write",
        error: expectedErrorMessage,
      })
    }

    it("should return Fail when data cannot be written into DB", async () => {
      const errorMessage = "Oops this should not happen"
      assertFailCases(new Error(errorMessage), errorMessage)
    })

    it("should return Fail when data cannot be written into DB with improper error object", async () => {
      const errorMessage = "Oops this should not happen"
      assertFailCases(errorMessage, errorMessage)
    })

    it("should display listing when passed with view = history query", async () => {
      const historyResult = [
        {
          id: 1,
          jobName: "Test CronJob 1",
          createdAt: new Date(),
        },
        {
          id: 2,
          jobName: "Test CronJob 2",
          createdAt: new Date(),
        },
      ]
      prismaMock.cronJob.findMany.mockResolvedValue(historyResult)
      const response = await execute("history")
      expect(response.status).toBe(200)
      expect(await response.json()).toStrictEqual(
        historyResult.map((it) => ({
          ...it,
          createdAt: `${it.createdAt.toISOString()}`,
        }))
      )
    })
  })

  it("should use nodejs runtime", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })

  it("should call execute with correct header", async () => {
    const setHeaderFn = jest.fn()
    const setStatusFn = jest.fn()
    const mockExecute = jest.fn()
    mockExecute.mockImplementation(
      () =>
        new Response(JSON.stringify({}), {
          status: 200,
        })
    )
    jest.mock("@/pages/api/cron/_cron", () => {
      return {
        execute: mockExecute,
      }
    })
    const cronJob = require("@/pages/api/cron").default
    const nextRequest = new NextApiRequestMock({
      query: { view: "history" },
    })
    const { nextResponse } = mockResponse(setHeaderFn, setStatusFn)
    await cronJob(nextRequest, nextResponse)
    expect(mockExecute).toBeCalledWith("history")
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(setStatusFn).toBeCalledWith(200)
  })
})
