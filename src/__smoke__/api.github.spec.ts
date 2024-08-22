import { test, expect } from "@playwright/test"

test.describe("api call can be called from walcron setup", () => {
  test("can trigger walcron api without getting CORS", async () => {
    const response = await fetch("http://walcron.com/api/cron?action=invalid", {
      method: "POST",
    })
    expect(response.status).toBe(400)
  })
})
