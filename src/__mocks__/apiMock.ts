import { IncomingMessage } from "http"
import { Socket } from "net"
import type { Env } from "@next/env"
import { NextApiRequest, NextApiResponse } from "next"
import { NextApiRequestQuery } from "next/dist/server/api-utils"
import { GetStaticPropsContext } from "next/types"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"

const defaultProcessEnv = { ...process.env }

export type NextApiRequestOptions = Partial<NextApiRequestMock>
export class NextApiRequestMock
  extends IncomingMessage
  implements NextApiRequest
{
  public query: NextApiRequestQuery = {}
  public cookies: Partial<{
    [key: string]: string
  }> = {}
  public env: Env = {}
  public body: any

  constructor(options?: NextApiRequestOptions) {
    super(new Socket())

    if (options) {
      this.method = options.method
      this.body = options.body
      this.query = options.query || {}
      this.headers = options.headers || {}
      this.env = options.env || {}
    }
  }
}

export class NextApiResponseMock {
  send(body: string) {}

  json(jsonBody: object) {}

  status(statusCode: number) {}

  setHeader(name: string, value: string | number | readonly string[]) {}
}

export const mockResponse = (
  setHeaderFn = jest.fn(),
  statusFn = jest.fn(),
  jsonFn = jest.fn()
) => {
  const nextRequest: NextApiRequest = new NextApiRequestMock() as NextApiRequest
  const nextResponse: NextApiResponse =
    new NextApiResponseMock() as unknown as NextApiResponse
  jest
    .spyOn(nextResponse, "setHeader")
    .mockImplementationOnce(
      (name: string, value: string | number | readonly string[]) => {
        setHeaderFn(name, value)
        return nextResponse
      }
    )
  jest
    .spyOn(nextResponse, "status")
    .mockImplementationOnce((statusCode: number) => {
      statusFn(statusCode)
      return nextResponse
    })
  jest.spyOn(nextResponse, "json").mockImplementationOnce((json: object) => {
    jsonFn(json)
    return nextResponse
  })

  return { nextRequest, nextResponse }
}

export const setEnv = (environments: { [key: string]: string }) => {
  Object.keys(environments).forEach((key: string) => {
    process.env[key] = environments[key]
  })
}

export const EmptyStaticPropsContext: GetStaticPropsContext<NextParsedUrlQuery> =
  {}

afterEach(() => {
  jest.resetModules()
  process.env = defaultProcessEnv
})
