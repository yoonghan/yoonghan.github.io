import { NextApiRequest, NextApiResponse } from "next"
import prismaClient from "@/transport/prismaClient"

type ResponseMessage = {
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

const executeCron = async (res: NextApiResponse<ResponseMessage>) => {
  const result = await writeAPost()
  const hasError = result.error
  return res.status(hasError ? 500 : 200).json(result)
}

//See https://vercel.com/docs/cron-jobs
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json")
  await executeCron(res)
}

export const config = { runtime: "nodejs" }

export default handler
