import { NextRequest, NextResponse } from "next/server"
import { CronJob, Message, execute } from "@/app/api/cron/module"

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
