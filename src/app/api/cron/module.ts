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

const executeCron = async (
  method: string
): Promise<{
  message: string
  error?: unknown
}> => {
  const result = await logJob(method)

  return result
}

const listCronHistory = async (): Promise<CronJob[]> => {
  const result = await prismaClient.cronJob.findMany()
  return result
}

export const execute = async (
  action: string | null | undefined,
  method: string = "GET"
): Promise<{ message?: string; error?: unknown } | CronJob[]> => {
  switch (action) {
    case null:
    case undefined:
      return await listCronHistory()
    case "log":
      return await executeCron(method)
    default:
      return {
        error: "Only GET with action query of log",
      }
  }
}
