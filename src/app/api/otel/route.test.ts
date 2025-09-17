import { POST } from "./route"
import { NextRequest } from "next/server"

const mockFetch = jest.fn()
global.fetch = mockFetch

const originalEnv = process.env

beforeAll(() => {
  process.env = {
    ...originalEnv,
    AXIOM_API_TOKEN: "test-axiom-token",
    AXIOM_DATASET_NAME: "test-axiom-dataset",
  }
})

afterAll(() => {
  process.env = originalEnv
})

describe("POST /api/otel", () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it("should proxy the request to Axiom successfully", async () => {
    const requestBody = JSON.stringify({ trace: "data" })
    const request = new NextRequest("http://localhost/api/otel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    })

    mockFetch.mockResolvedValueOnce(new Response("OK", { status: 200 }))

    const response = await POST(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith("https://api.axiom.co/v1/traces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test-axiom-token",
        "X-Axiom-Dataset": "test-axiom-dataset",
      },
      duplex: "half",
      body: request.body,
    })

    expect(response.status).toBe(200)
    const responseText = await response.text()
    expect(responseText).toBe("OK")
  })

  it("should handle errors from the Axiom API", async () => {
    const requestBody = JSON.stringify({ trace: "data" })
    const request = new NextRequest("http://localhost/api/otel", {
      method: "POST",
      body: requestBody,
    })

    mockFetch.mockResolvedValueOnce(
      new Response("Unauthorized", { status: 401 }),
    )

    const response = await POST(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(401)
    const responseText = await response.text()
    expect(responseText).toBe("Unauthorized")
  })

  it("should handle network errors when calling Axiom", async () => {
    const requestBody = JSON.stringify({ trace: "data" })
    const request = new NextRequest("http://localhost/api/otel", {
      method: "POST",
      body: requestBody,
    })

    const errorMessage = "Network failed"
    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const response = await POST(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
    const responseText = await response.text()
    expect(responseText).toBe(errorMessage)
  })
})
