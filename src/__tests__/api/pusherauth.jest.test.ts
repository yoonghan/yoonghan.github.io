import "../../__mocks__/apiMockNext13"
import { POST } from "@/app/api/pusherauth/route"
import { PusherAPIClient } from "@/app/api/pusherauth/PusherAPIClient"
import { NextRequest } from "next/server"
import { setEnv } from "../../__mocks__/setEnv"

describe("pusherauth", () => {
  const mockRequest = (channel_name: string = "sample_channel") => {
    const form = new FormData()
    form.set("socket_id", "432.123")
    form.set("channel_name", channel_name)
    return new NextRequest("http://walcron.com", {
      method: "POST",
      body: form,
    })
  }

  it("should return error with environment not set", async () => {
    const response = await POST(mockRequest())
    expect(response.status).toBe(500)
    expect(await response.json()).toStrictEqual({
      error: "Pusher initialized values has not been set.",
    })
  })

  describe("environment setup", () => {
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

    it("should return error with empty form set", async () => {
      const response = await POST(
        new NextRequest("http://walcron.com", {
          method: "POST",
          body: new FormData(),
        })
      )
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "Invalid socket id: ''",
      })
    })

    it("should return error when only socket id is passed", async () => {
      const form = new FormData()
      form.set("socket_id", "123.33")
      const response = await POST(
        new NextRequest("http://walcron.com", {
          method: "POST",
          body: form,
        })
      )
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "Invalid channel name: ''",
      })
    })

    it("should to authenticate successfully for a POST", async () => {
      const response = await POST(mockRequest())
      expect(response.status).toBe(200)
      const result = await response.json()
      expect(result.auth as string).toContain(`${APP_KEY}:`)
    })

    it("should be able to fail authentication", async () => {
      jest
        .spyOn(PusherAPIClient.client!, "authorizeChannel")
        .mockReturnValueOnce({ auth: "" })
      const response = await POST(mockRequest())
      expect(response.status).toBe(401)
      expect(await response.json()).toStrictEqual({ error: "Not authorized." })
    })
  })
})
