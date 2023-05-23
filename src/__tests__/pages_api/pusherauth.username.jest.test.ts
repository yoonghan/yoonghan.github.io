import "../../__mocks__/apiMockNext13"
import {
  extractPresenceData,
  POST,
} from "@/app/api/pusherauth/[username]/route"
import { PusherAPIClient } from "@/app/api/pusherauth/PusherAPIClient"
import { NextRequest } from "next/server"
import { Response } from "pusher"
import { setEnv } from "../../__mocks__/setEnv"

describe("pusherauth/username", () => {
  const mockRequest = (channel_name: string = "sample_channel") => {
    const form = new FormData()
    form.set("socket_id", "432.123")
    form.set("channel_name", channel_name)
    return new NextRequest("http://walcron.com", {
      method: "POST",
      body: form,
    })
  }

  it("should get error without environment set", async () => {
    const response = await POST(mockRequest(), { params: {} })
    expect(response.status).toBe(500)
    expect(await response.json()).toStrictEqual({
      error: "Pusher initialized values has not been set.",
    })
  })

  describe("environment setup", () => {
    const usernameParam = { params: { username: "alice" } }
    const APP_KEY = "SampleKey"

    beforeEach(() => {
      setEnv({
        NEXT_PUBLIC_PUSHER_APP_KEY: APP_KEY,
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

    const mockUserResponse = (users: { id: string }[]) => {
      const userResponse = createResponse(users)
      jest.spyOn(PusherAPIClient.client!, "get").mockResolvedValue(userResponse)
    }

    it("should get error when username is not passed", async () => {
      const response = await POST(mockRequest(), {
        params: {},
      })
      expect(response.status).toBe(400)
      expect(await response.json()).toStrictEqual({
        error: "Username defined is not valid.",
      })
    })

    it("should suceed when correct username is set", async () => {
      mockUserResponse([])
      const response = await POST(mockRequest(), usernameParam)
      expect(response.status).toBe(200)
      const result = await response.json()
      expect(result.auth as string).toContain(`${APP_KEY}:`)
      expect(JSON.parse(result.channel_data)).toStrictEqual({
        user_id: "alice",
        user_info: { name: "Alice" },
      })
    })

    it("should return error with empty form set", async () => {
      mockUserResponse([])
      const response = await POST(
        new NextRequest("http://walcron.com", {
          method: "POST",
          body: new FormData(),
        }),
        usernameParam
      )
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "Invalid socket id: ''",
      })
    })

    it("should return error when only socket id is passed", async () => {
      mockUserResponse([])
      const form = new FormData()
      form.set("socket_id", "123.33")
      const response = await POST(
        new NextRequest("http://walcron.com", {
          method: "POST",
          body: form,
        }),
        usernameParam
      )
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "Invalid channel name: ''",
      })
    })

    it("should to fail if passed userid is invalid", async () => {
      mockUserResponse([])
      const form = new FormData()
      form.set("socket_id", "123.33")
      const response = await POST(mockRequest(), {
        params: { username: "i should special #@$" },
      })
      expect(response.status).toBe(400)
      expect(await response.json()).toStrictEqual({
        error: "Username defined is not valid.",
      })
    })

    it("should be able to fail authentication", async () => {
      mockUserResponse([])
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })
      const response = await POST(mockRequest(), usernameParam)
      expect(response.status).toBe(401)
      expect(await response.json()).toStrictEqual({ error: "Not authorized." })
    })

    it("should fail if user already exists", async () => {
      mockUserResponse([{ id: usernameParam.params.username }])
      const response = await POST(mockRequest(), usernameParam)
      expect(response.status).toBe(409)
      expect(await response.json()).toStrictEqual({
        error: "User already exist.",
      })
    })

    it("should consider user does not exist if getuser api fail and succeed", async () => {
      jest
        .spyOn(PusherAPIClient.client!, "get")
        .mockResolvedValue(createResponse([], 400))
      const response = await POST(mockRequest(), usernameParam)
      expect(response.status).toBe(200)
      const result = await response.json()
      expect(result.auth as string).toContain(`${APP_KEY}:`)
      expect(JSON.parse(result.channel_data)).toStrictEqual({
        user_id: "alice",
        user_info: { name: "Alice" },
      })
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
