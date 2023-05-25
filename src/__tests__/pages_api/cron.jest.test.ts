import "../../__mocks__/apiMockNext13"
import { NextRequest } from "next/server"

describe("cron", () => {
  const executeFn = jest.fn()

  const getGet = (() => {
    jest.mock("@/app/api/cron/module", () => {
      return {
        execute: executeFn,
      }
    })
    const { GET } = require("@/app/api/cron/route")
    return GET
  })()

  it("should call execute with correct query and method", async () => {
    const request = new NextRequest("http://walcron.com/api/cron", {
      method: "GET",
    })

    const response = await getGet(request)
    expect(response.status).toBe(200)
    expect(executeFn).toHaveBeenCalled()
  })

  it("should call execute with error when exception is returned", async () => {
    executeFn.mockReturnValue({
      error: "mimic exception",
    })
    const request = new NextRequest("http://walcron.com/api/cron", {
      method: "GET",
    })
    const response = await getGet(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "mimic exception",
    })
  })
})
