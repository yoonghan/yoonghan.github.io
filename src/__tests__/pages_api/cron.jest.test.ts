import "../../__mocks__/fetchMock"
import { mockResponse, NextApiRequestMock } from "../../__mocks__/apiMock"
import { config } from "@/pages/api/cron"

describe("cron", () => {
  it("should use nodejs runtime", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })

  it("should call execute with correct query and method", async () => {
    const setHeaderFn = jest.fn()
    const setStatusFn = jest.fn()
    const mockExecute = jest.fn()
    mockExecute.mockImplementation(
      () =>
        new Response(JSON.stringify({}), {
          status: 200,
        })
    )
    jest.mock("@/pageComponents/api/cron/module", () => {
      return {
        execute: mockExecute,
      }
    })
    const cronJob = require("@/pages/api/cron").default
    const nextRequest = new NextApiRequestMock({
      query: { view: "history" },
      method: "POST",
    })
    const { nextResponse } = mockResponse(setHeaderFn, setStatusFn)
    await cronJob(nextRequest, nextResponse)
    expect(mockExecute).toBeCalledWith("history", "POST")
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(setStatusFn).toBeCalledWith(200)
  })
})
