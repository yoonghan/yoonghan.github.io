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
      return this.body
    }
    return undefined
  }
}

export class NextResponse extends Response {
  public body: any

  send(body: string) {}

  setHeader(name: string, value: string | number | readonly string[]) {}

  static json = (body: any, init?: ResponseInit) => {
    return new NextResponse(JSON.stringify(body), init)
  }

  // Commented, not in used, uncomment if wanted to use
  // static redirect(
  //   url: string | NextURL | URL,
  //   init?: number | ResponseInit
  // ): NextResponse
  // static rewrite(
  //   destination: string | NextURL | URL,
  //   init?: MiddlewareResponseInit
  // ): NextResponse
  // static next(init?: MiddlewareResponseInit): NextResponse
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
