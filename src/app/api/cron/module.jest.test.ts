import "@/__tests__/mocks/firebaseAdminMock"
import "@/__tests__/mocks/fetchMock"
import { setEnv } from "@/__tests__/mocks/setEnv"
import {
  sampleFirebaseConfig,
  setStoreCollectionGetReturn,
} from "@/__tests__/mocks/firebaseAdminMock"
import { execute } from "./module"

describe("cron/Module", () => {
  beforeEach(() => {
    setEnv(sampleFirebaseConfig)
  })

  it("should return Fail when request to write to log", async () => {
    const response = await execute("log")
    expect(response).toStrictEqual({
      message: "OK",
    })
  })

  it("should return ok if today is retrieved", async () => {
    setStoreCollectionGetReturn()
    const response = await execute("today")
    expect(response).toStrictEqual({
      message: "2024-09-01T01:01:01.293Z",
    })
  })

  it("should return failed if today is retrieved", async () => {
    setStoreCollectionGetReturn(true)
    const response = await execute("today")
    expect(response).toStrictEqual({
      error: "Message not found",
      message: "Not Found",
    })
  })

  it("should return list of matched data", async () => {
    const response = await execute(null)
    expect(response).toStrictEqual([
      {
        id: 1,
        method: "GET",
        source: "Cron",
        createdAt: "2024-12-01T01:01:01.293Z",
      },
    ])
  })

  it("should no longer invalid reponse for unknown usage", async () => {
    const response = await execute("others")
    expect(response).toStrictEqual({
      message: "Only GET with action query of log",
      error: `(others) action not supported.`,
    })
  })
})
