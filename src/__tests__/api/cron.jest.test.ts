import "../../__mocks__/apiMockNext13"
import { GET } from "@/app/api/cron/route"
import { NextRequest } from "next/server"

describe("cron", () => {
  it("should call execute with correct query and method", async () => {
    const request = new NextRequest("http://walcron.com/api/cron", {
      method: "GET",
    })
    const historyResult = [
      {
        id: 1,
        jobName: "Test CronJob 1",
        createdAt: new Date(),
      },
    ]
    const response = await GET(request)
    expect(response.status).toBe(200)
    expect(await response.json()).toStrictEqual([])
  })

  it("should call execute with error when exception is returned", async () => {
    const request = new NextRequest(
      "http://walcron.com/api/cron?action=invalid",
      {
        method: "GET",
      }
    )
    const response = await GET(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "Only GET with action query of log",
    })
  })
})
