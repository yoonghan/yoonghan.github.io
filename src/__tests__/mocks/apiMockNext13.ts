import { IncomingMessage } from "http"
import { Socket } from "net"

class NextRequest extends IncomingMessage {
  public cookies: Partial<{
    [key: string]: string
  }> = {}
  public body: any
  public url: any

  constructor(url: URL | string, options?: RequestInit) {
    super(new Socket())

    if (options) {
      this.method = options.method
      this.body = options.body
      this.url = url
    }
  }

  public formData = () => {
    if (this.body instanceof FormData) {
      return new Promise((resolve) => resolve(this.body))
    }
    return undefined
  }

  public json = async () => {
    if (this.body instanceof String || typeof this.body === "string") {
      return new Promise((resolve) => resolve(JSON.parse(this.body as string)))
    }
    return undefined
  }
}

export class NextResponse extends Response {
  public body: any

  send(body: string) {}

  setHeader(name: string, value: string | number | readonly string[]) {}

  static readonly json = (body: any, init?: ResponseInit) => {
    return new NextResponse(JSON.stringify(body), init)
  }
}

jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  NextRequest,
  NextResponse,
}))

jest.mock("next/dist/server/web/spec-extension/request", () => ({
  ...jest.requireActual("next/dist/server/web/spec-extension/request"),
  NextRequest,
}))

jest.mock("next/dist/server/web/spec-extension/response", () => ({
  ...jest.requireActual("next/dist/server/web/spec-extension/response"),
  NextResponse,
}))
