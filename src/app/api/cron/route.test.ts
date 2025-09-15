import "@/__tests__/mocks/apiMockNext13"
import { GET } from "./route"
import { NextRequest } from "next/server"
import { execute } from "@/app/api/cron/module"
import { SpanStatusCode } from "@opentelemetry/api"

// Mock dependencies
jest.mock("@/app/api/cron/module", () => ({
  execute: jest.fn(),
}))

const mockSpan = {
  setAttribute: jest.fn(),
  setStatus: jest.fn(),
  recordException: jest.fn(),
  end: jest.fn(),
}

const mockTracer = {
  startActiveSpan: jest.fn().mockImplementation((name, fn) => {
    return fn(mockSpan)
  }),
}

jest.mock("@opentelemetry/api", () => {
  const originalApi = jest.requireActual("@opentelemetry/api")
  return {
    ...originalApi,
    trace: {
      getTracer: jest.fn(() => mockTracer),
    },
  }
})

describe("GET /api/cron", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should call execute, trace the request, and return a successful response", async () => {
    const mockResponse = [{ job: "test", status: "success" }]
    ;(execute as jest.Mock).mockResolvedValue(mockResponse)

    const request = new NextRequest(
      "http://localhost/api/cron?action=my-action",
    )
    const response = await GET(request)
    const responseBody = await response.json()

    expect(execute).toHaveBeenCalledWith("my-action")
    expect(response.status).toBe(200)
    expect(responseBody).toEqual(mockResponse)

    expect(mockTracer.startActiveSpan).toHaveBeenCalledWith(
      "cron.GET",
      expect.any(Function),
    )
    expect(mockSpan.setAttribute).toHaveBeenCalledWith("action", "my-action")
    expect(mockSpan.setStatus).toHaveBeenCalledWith({ code: SpanStatusCode.OK })
    expect(mockSpan.recordException).not.toHaveBeenCalled()
    expect(mockSpan.end).toHaveBeenCalled()
  })

  it("should handle errors, trace the error, and return a 400 response", async () => {
    const error = new Error("Execution failed")
    const mockErrorResponse = {
      error: error,
      message: "Something went wrong",
    }
    ;(execute as jest.Mock).mockResolvedValue(mockErrorResponse)

    const request = new NextRequest(
      "http://localhost/api/cron?action=failing-action",
    )
    const response = await GET(request)
    const responseBody = await response.json()

    expect(execute).toHaveBeenCalledWith("failing-action")
    expect(response.status).toBe(400)
    expect(responseBody.message).toBe(mockErrorResponse.message)

    expect(mockTracer.startActiveSpan).toHaveBeenCalledWith(
      "cron.GET",
      expect.any(Function),
    )
    expect(mockSpan.setAttribute).toHaveBeenCalledWith(
      "action",
      "failing-action",
    )
    expect(mockSpan.setStatus).toHaveBeenCalledWith({
      code: SpanStatusCode.ERROR,
      message: mockErrorResponse.message,
    })
    expect(mockSpan.recordException).toHaveBeenCalledWith(error)
    expect(mockSpan.end).toHaveBeenCalled()
  })

  it("should handle requests with no action", async () => {
    const mockResponse = [{ job: "default", status: "success" }]
    ;(execute as jest.Mock).mockResolvedValue(mockResponse)

    const request = new NextRequest("http://localhost/api/cron")
    await GET(request)

    expect(execute).toHaveBeenCalledWith(null)
    expect(mockSpan.setAttribute).toHaveBeenCalledWith("action", "none")
  })
})
