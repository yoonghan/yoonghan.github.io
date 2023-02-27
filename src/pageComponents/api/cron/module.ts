import prismaClient from "@/transport/prismaClient"
import { CronJob } from "@prisma/client"

type CreateResponse = {
  message: string
  error?: unknown
}

const logJob = async (method: string) => {
  try {
    await prismaClient.cronJob.create({
      data: {
        jobName: `${method.toUpperCase()} via cron job`,
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

const executeCron = async (method: string): Promise<Response> => {
  const result = await logJob(method)
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

export const execute = async (
  action?: string | string[],
  method: string = "GET"
): Promise<Response> => {
  switch (action) {
    case undefined:
      return await listCronHistory()
    case "log":
      return await executeCron(method)
    default:
      return generateResponse(400, {
        message: "Only GET with action query of log",
      })
  }
}
