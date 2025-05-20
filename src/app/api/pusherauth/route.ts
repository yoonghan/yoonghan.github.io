import { PusherAPIClient } from "./PusherAPIClient"
import { NextRequest, NextResponse } from "next/server"

export type ResponseMessage = {
  message?: string
  auth?: string
}

const postMessage = async (req: NextRequest) => {
  const formData = await req.formData()
  const socket_id = formData.get("socket_id")?.toString() ?? ""
  const channel_name = formData.get("channel_name")?.toString() ?? ""

  const client = PusherAPIClient.client
  if (client) {
    const authToken = client.authorizeChannel(socket_id, channel_name)
    if (authToken?.auth && authToken.auth !== "") {
      return NextResponse.json(authToken)
    } else {
      return NextResponse.json(
        { error: "Not authorized." },
        {
          status: 401,
        }
      )
    }
  } else {
    return NextResponse.json(
      { error: "Pusher initialized values has not been set." },
      {
        status: 500,
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    return await postMessage(request)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
      },
      { status: 405 }
    )
  }
}
