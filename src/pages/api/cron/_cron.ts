import prismaClient from "@/transport/prismaClient"
import { CronJob } from "@prisma/client"

type CreateResponse = {
  message: string
  error?: unknown
}

const writeAPost = async () => {
  try {
    await prismaClient.cronJob.create({
      data: {
        jobName: "Written from cron job",
      },
    })
    return {
      message: "Posted a cron job",
    }
  } catch (error) {
    return {
      message: "Fail to write",
      error: error instanceof Error ? error.message : error,
    }
  }
}

const executeCron = async (): Promise<Response> => {
  const result = await writeAPost()
  const hasError = result.error

  return generateResponse(hasError ? 500 : 200, result)
}

const listCronHistory = async (): Promise<Response> => {
  const result = await prismaClient.cronJob.findMany()
  return generateResponse(200, result)
}

const generateResponse = (status: number, body: CronJob[] | CreateResponse) =>
  new Response(JSON.stringify(body), {
    status: status,
  })

export const execute = async (view?: string | string[]): Promise<Response> => {
  switch (view) {
    case "history":
      return await listCronHistory()
    default:
      return await executeCron()
  }
}
