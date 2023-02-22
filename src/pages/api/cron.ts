import type { NextRequest } from "next/server"

const handler = (req: NextRequest): Response =>
  new Response(`Sample cron job`, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  })

export default handler
