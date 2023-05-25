import "../../__mocks__/apiMockNext13"
import { NextRequest, NextResponse } from "next/server"

describe("cron", () => {
  it("should call execute with correct query and method", async () => {
    const executeFn = jest.fn()
    const request = new NextRequest("http://walcron.com/api/cron", {
      method: "GET",
    })
    jest.mock("@/app/api/cron/module", () => {
      return {
        execute: executeFn,
      }
    })
    const { GET } = require("@/app/api/cron/route")
    const response = await GET(request)
    expect(response.status).toBe(200)
    expect(executeFn).toHaveBeenCalled()
  })

  it("should call execute with error when exception is returned", async () => {
    const executeFn = jest.fn()
    const request = new NextRequest(
      "http://walcron.com/api/cron?action=invalid",
      {
        method: "GET",
      }
    )
    const { GET } = require("@/app/api/cron/route")
    const response = await GET(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "Only GET with action query of log",
    })
  })
})
