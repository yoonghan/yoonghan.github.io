import prismaClient from "@/transport/prismaClient"
//import { CronJob } from "@prisma/client"

type CreateResponse = {
  message: string
  error?: unknown
}

const logJob = async (method: string) => {
  return {
    message: "Fail to write",
    error: "I no longer work",
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

const listCronHistory = async (): Promise<string[]> => {
  return []
}

export const execute = async (
  action: string | null | undefined,
  method: string = "GET"
): Promise<{ message?: string; error?: unknown } | string[]> => {
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
