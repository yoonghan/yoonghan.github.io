import { trace, SpanStatusCode } from "@opentelemetry/api"
import { NextRequest, NextResponse } from "next/server"
import { execute } from "@/app/api/cron/module"
import { CronJob, Message } from "@/types/cron"
import { toError } from "@/util/errorHandler"

function isMessage(response: Message | CronJob): response is Message {
  return (<Message>response).error !== undefined
}

export async function GET(request: NextRequest) {
  const tracer = trace.getTracer("cron-job-api")
  return await tracer.startActiveSpan("cron.GET", async (span) => {
    const { searchParams } = request.nextUrl
    const action = searchParams.get("action")
    span.setAttribute("action", action || "none")

    const response = await execute(action)
    if (!(response instanceof Array) && isMessage(response) && response.error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: response.message })
      span.recordException(toError(response.error))
      span.end()
      return NextResponse.json(
        {
          message: response.message,
          error: response.error,
        },
        {
          status: 400,
        },
      )
    } else {
      span.setStatus({ code: SpanStatusCode.OK })
      span.end()
      return NextResponse.json(response)
    }
  })
}
