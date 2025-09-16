import { PusherAPIClient } from "./PusherAPIClient"
import { NextRequest, NextResponse } from "next/server"
import { trace } from "@opentelemetry/api"

export type ResponseMessage = {
  message?: string
  auth?: string
}

const postMessage = async (req: NextRequest) => {
  const tracer = trace.getTracer("pusher-auth")
  return await tracer.startActiveSpan(
    "authorize-pusher-channel",
    async (span) => {
      const formData = await req.formData()
      const socket_id = formData.get("socket_id")?.toString() ?? ""
      const channel_name = formData.get("channel_name")?.toString() ?? ""

      span.setAttributes({
        "pusher.socket_id": socket_id,
        "pusher.channel_name": channel_name,
      })

      const client = PusherAPIClient.client
      if (client) {
        const authToken = client.authorizeChannel(socket_id, channel_name)
        if (authToken?.auth && authToken.auth !== "") {
          span.end()
          return NextResponse.json(authToken)
        } else {
          span.end()
          return NextResponse.json(
            { error: "Not authorized." },
            {
              status: 401,
            },
          )
        }
      } else {
        span.end()
        return NextResponse.json(
          { error: "Pusher initialized values has not been set." },
          {
            status: 500,
          },
        )
      }
    },
  )
}

export async function POST(request: NextRequest) {
  try {
    return await postMessage(request)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
      },
      { status: 405 },
    )
  }
}
