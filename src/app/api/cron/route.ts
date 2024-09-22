import { NextRequest, NextResponse } from "next/server"
import { execute } from "@/app/api/cron/module"
import { CronJob, Message } from "@/types/cron"

function isMessage(response: Message | CronJob): response is Message {
  return (<Message>response).error !== undefined
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")
  let response = await execute(action)
  if (!(response instanceof Array) && isMessage(response) && response.error) {
    return NextResponse.json(
      {
        message: response.message,
        error: response.error,
      },
      {
        status: 400,
      }
    )
  } else {
    return NextResponse.json(response)
  }
}
