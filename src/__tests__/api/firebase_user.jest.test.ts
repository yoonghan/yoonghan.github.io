import "../../__mocks__/apiMockNext13"
import "../../__mocks__/uuidMock"
import "../../__mocks__/firebaseAdminMock"
import { setEnv } from "../../__mocks__/setEnv"
import { POST, GET } from "@/app/api/firebase/user/route"
import { NextRequest } from "next/server"

describe("firebase/user", () => {
  const mockRequest = (json = {}) => {
    return new NextRequest("http://walcron.com", {
      method: "POST",
      body: JSON.stringify(json),
    })
  }

  it("should get api response from GET", async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect((await response.json()).data).toStrictEqual({
      message: "API to manager Walcron users.",
    })
  })

  it("should fail when email input are not acceptable", async () => {
    const response = await POST(mockRequest({ password: "password123" }))
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "Invalid email.",
    })
  })

  it("should fail when password input are not acceptable", async () => {
    const response = await POST(mockRequest({ email: "han@gmail.com" }))
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "Invalid password.",
    })
  })

  it("should fail without environment set", async () => {
    const response = await POST(
      mockRequest({ email: "han@test.com", password: "test123" })
    )
    expect(response.status).toBe(400)
    expect(await response.json()).toStrictEqual({
      error: "One of the Firebase key was not initialized.",
    })
  })

  describe("environment setup", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeEach(() => {
      setEnv({
        FIREBASE_PROJECT_ID: "SampleProjectId",
        FIREBASE_PRIVATE_KEY_ID: "SamplePrivateKeyId",
        FIREBASE_PRIVATE_KEY: "SamplePrivateKey",
        FIREBASE_CLIENT_EMAIL: "SampleClientEmail",
        FIREBASE_CLIENT_ID: "SampleClientId",
        FIREBASE_CLIENT_X509_CERT_URL: "SampleClientX509Cert",
      })
    })

    it("should create user", async () => {
      const response = await POST(
        mockRequest({ email: "han@test.com", password: "password123" })
      )
      expect(response.status).toBe(200)
      expect(await response.json()).toStrictEqual({
        data: { uid: "han@test.com" },
        status: "ok",
      })
    })
  })
})
