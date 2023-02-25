import { prismaMock } from "../../__mocks__/prismaMock"
import { mockResponse } from "../../__mocks__/apiMock"
import cronJob, { config } from "@/pages/api/cron"

describe("cron", () => {
  it("should return an OK when data can be tracked", async () => {
    prismaMock.cronJob.create.mockResolvedValue({
      id: 1,
      jobName: "Test CronJob",
      createdAt: new Date(),
    })
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    await cronJob(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(200)
    expect(jsonFn).toBeCalledWith({ message: "Posted a cron job" })
  })

  const assertFailCases = async (
    error: Error | string,
    expectedErrorMessage: string
  ) => {
    prismaMock.cronJob.create.mockRejectedValue(error)
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    await cronJob(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(500)
    expect(jsonFn).toBeCalledWith({
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

  it("should use nodejs runtime", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })
})
