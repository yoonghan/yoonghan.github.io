import "../../../__mocks__/fetchMock"
import { execute } from "./module"

describe("cron/Module", () => {
  it("should return Fail when request to write to log", async () => {
    const response = await execute("log")
    expect(response).toStrictEqual({
      message: "Fail to write",
      error: "I no longer work",
    })
  })

  it("should no longer return response", async () => {
    const response = await execute(null)
    expect(response).toStrictEqual([])
  })

  it("should no longer invalid reponse for unknown usage", async () => {
    const response = await execute("")
    expect(response).toStrictEqual({
      error: "Only GET with action query of log",
    })
  })
})
