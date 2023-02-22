import cronJob from "@/pages/api/cron"
import { NextRequest } from "next/server"
import "../../__mocks__/fetchMock"

describe("cron", () => {
  let nextRequest = {} as NextRequest

  it("should return an OK when triggered", async () => {
    const response: Response = cronJob(nextRequest)
    expect(await response.text()).toBe("Sample cron job")
  })
})
