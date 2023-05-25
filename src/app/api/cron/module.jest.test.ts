import "../../../__mocks__/fetchMock"
import { prismaMock } from "../../../__mocks__/prismaMock"
import { execute } from "./module"

describe("cron/Module", () => {
  it("should return an OK when data can be tracked", async () => {
    prismaMock.cronJob.create.mockResolvedValue({
      id: 1,
      jobName: "Test CronJob",
      createdAt: new Date(),
    })
    const response = await execute("log")
    expect(await response).toStrictEqual({
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
    await execute("log", requestMethod)
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
    const response = await execute("log")
    expect(response).toStrictEqual({
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

  it("should display listing when passed with action = history query", async () => {
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
    const response = await execute(null)
    expect(await response).toStrictEqual(
      historyResult.map((it) => ({
        ...it,
        createdAt: it.createdAt,
      }))
    )
  })

  it("should display error if action has no query", async () => {
    const response = await execute("invalid")
    expect(await response).toStrictEqual({
      error: "Only GET with action query of log",
    })
  })
})
