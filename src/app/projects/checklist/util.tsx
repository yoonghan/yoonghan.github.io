import { PostedJob } from "./Checklist"
import prismaClient from "@/transport/prismaClient"
import { CronJob } from "@prisma/client"

export async function getPostedCronJob(): Promise<PostedJob | undefined> {
  const firstCronJob = await prismaClient.cronJob.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  })
  return cleanupPostResponse(firstCronJob)
}

const cleanupPostResponse = (post: CronJob | null): PostedJob | undefined => {
  if (post && post !== null) {
    return {
      jobName: post.jobName,
      createdAt: post.createdAt.toISOString(),
    }
  }

  return undefined
}
