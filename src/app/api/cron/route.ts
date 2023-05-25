import { NextRequest, NextResponse } from "next/server"
import { execute } from "@/app/api/cron/module"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")
  let response = await execute(action)
  if (!(response instanceof Array) && response?.error) {
    return NextResponse.json(
      {
        error: response?.error,
      },
      {
        status: 400,
      }
    )
  } else {
    return NextResponse.json(response)
  }
}
