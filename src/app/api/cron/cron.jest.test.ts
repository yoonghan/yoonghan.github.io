import "@/__tests__/mocks/apiMockNext13"
import "@/__tests__/mocks/firebaseAdminMock"
import { setEnv } from "@/__tests__/mocks/setEnv"
import { sampleFirebaseConfig } from "@/__tests__/mocks/firebaseAdminMock"
import { GET } from "@/app/api/cron/route"
import { NextRequest } from "next/server"

describe("cron", () => {
  beforeEach(() => {
    setEnv(sampleFirebaseConfig)
  })

  it("should call execute with correct query and method", async () => {
    const request = new NextRequest("http://walcron.com/api/cron", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    expect(await response.json()).toStrictEqual([
      {
        id: 1,
        method: "GET",
        source: "Cron",
        createdAt: "2024-12-01T01:01:01.293Z",
      },
    ])
  })

  it("should call execute with error when exception is returned", async () => {
    const request = new NextRequest(
      "http://walcron.com/api/cron?action=invalid",
      {
        method: "GET",
      },
    )
    const response = await GET(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "(invalid) action not supported.",
      message: "Only GET with action query of log",
    })
  })
})
