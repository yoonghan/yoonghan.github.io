import "../../../__mocks__/fetchMock"
import { prismaMock } from "../../../__mocks__/prismaMock"
import { execute } from "@/pageComponents/api/cron/module"

describe("cron/Module", () => {
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

  it("should create with method being executed", async () => {
    const requestMethod = "Post"
    const mockFn = prismaMock.cronJob.create
    mockFn.mockResolvedValue({
      id: 1,
      jobName: "Test CronJob",
      createdAt: new Date(),
    })
    await execute(undefined, requestMethod)
    expect(mockFn).toBeCalledWith({
      data: {
        jobName: `POST via cron job`,
      },
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
