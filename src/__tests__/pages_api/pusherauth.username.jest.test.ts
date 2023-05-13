import pusherAuth, {
  PusherAPIClient,
  config,
  extractPresenceData,
} from "@/pages/api/pusherauth/[username]"
import { Response } from "pusher"
import { mockResponse, setEnv } from "../../__mocks__/apiMock"

describe("pusherauth/username", () => {
  it("should return error if request are not POST", async () => {
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    await pusherAuth(nextRequest, nextResponse)
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
    await pusherAuth(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(500)
    expect(jsonFn).toBeCalledWith({
      error: "Pusher initialized values has not been set.",
    })
  })

  it("should use nodejs runtime", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })

  describe("environment setup", () => {
    beforeEach(() => {
      setEnv({
        NEXT_PUBLIC_PUSHER_APP_KEY: "SampleKey",
        APP_ID: "",
        PUSHER_SECRET: "",
        NEXT_PUBLIC_PUSHER_CLUSTER: "",
      })
      PusherAPIClient.reInitialize()
    })

    const createResponse = (users: { id: string }[], status = 200) =>
      ({
        status: status,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({ users })
          }),
      } as unknown as Response)

    it("should authenticate successfully for a POST request", async () => {
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
      nextRequest.query = {
        username: "billy",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "101010" })

      const response = createResponse([])
      jest.spyOn(PusherAPIClient.client!, "get").mockResolvedValue(response)

      await pusherAuth(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(200)
      expect(jsonFn).toBeCalledWith({ auth: "101010" })
    })

    it("should fail if user id is not provided", async () => {
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
      await pusherAuth(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(400)
      expect(jsonFn).toBeCalledWith({ error: "Username defined is not valid." })
    })

    it("should to fail if passed userid is invalid", async () => {
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
      nextRequest.query = {
        username: "bil-ly",
      }
      await pusherAuth(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(400)
      expect(jsonFn).toBeCalledWith({ error: "Username defined is not valid." })
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
      nextRequest.query = {
        username: "billy",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })

      const response = createResponse([])
      jest.spyOn(PusherAPIClient.client!, "get").mockResolvedValue(response)
      await pusherAuth(nextRequest, nextResponse)
      expect(statusFn).toBeCalledWith(401)
      expect(jsonFn).toBeCalledWith({ error: "Not authorized." })
    })

    it("should be able to fail if user already exists", async () => {
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
      nextRequest.query = {
        username: "billy",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })

      const response = createResponse([{ id: "billy" }])
      jest.spyOn(PusherAPIClient.client!, "get").mockResolvedValue(response)
      await pusherAuth(nextRequest, nextResponse)
      expect(statusFn).toBeCalledWith(409)
      expect(jsonFn).toBeCalledWith({ error: "User already exist." })
    })

    it("should should proceed and cont to authenticate if user checks fail", async () => {
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
      nextRequest.query = {
        username: "billy",
      }
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })

      const response = createResponse([], 400)
      jest.spyOn(PusherAPIClient.client!, "get").mockResolvedValue(response)
      await pusherAuth(nextRequest, nextResponse)
      expect(statusFn).toBeCalledWith(401)
    })
  })

  describe("presence data", () => {
    it("should test user name capitalized", () => {
      const response = extractPresenceData("mary Jane  ")
      expect(response).toStrictEqual({
        user_id: "maryjane",
        user_info: { name: "Mary Jane" },
      })
    })

    it("should return null if data is not string and non alphanumeric", () => {
      expect(extractPresenceData("")).toBeNull()
      expect(extractPresenceData("   ")).toBeNull()
      expect(extractPresenceData(["han"])).toBeNull()
      expect(extractPresenceData(undefined)).toBeNull()
      expect(extractPresenceData("han-")).toBeNull()
    })
  })
})
