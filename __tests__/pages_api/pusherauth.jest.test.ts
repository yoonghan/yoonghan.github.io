import "../../__mocks__/pusherMock"
import pusherAuth, { PusherAPIClient } from "@/pages/api/pusherauth"
import { mockResponse, setEnv } from "../../__mocks__/apiMock"

describe("pusherauth", () => {
  it("should return error if request are not POST", async () => {
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    pusherAuth(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(405)
    expect(jsonFn).toBeCalledWith({
      error: "Method null not recognized.",
    })
  })

  it("should get error without environment set", async () => {
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    nextRequest.method = "POST"
    nextRequest.body = {
      socket_id: "SOCKET_TEST",
      channel_name: "SAMPLE_CHANNEL",
    }
    pusherAuth(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(500)
    expect(jsonFn).toBeCalledWith({
      error: "Pusher initialized values has not been set.",
    })
  })

  describe("environment setup", () => {
    beforeEach(() => {
      setEnv({
        PUSHER_APP_KEY: "SampleKey",
        PUSHER_APP_ID: "",
        PUSHER_SECRET: "",
        PUSHER_CLUSTER: "",
      })
      PusherAPIClient.reInitialize()
    })

    it("should to authenticate successfully for a POST", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {
        socket_id: 1,
        channel_name: "SAMPLE_CHANNEL",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "101010" })
      pusherAuth(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(200)
      expect(jsonFn).toBeCalledWith({
        auth: "101010",
      })
    })

    it("should be able to fail authentication", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {
        socket_id: 1,
        channel_name: "SAMPLE_CHANNEL",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })
      pusherAuth(nextRequest, nextResponse)
      expect(statusFn).toBeCalledWith(401)
      expect(jsonFn).toBeCalledWith({ error: "Not authorized." })
    })
  })
})
