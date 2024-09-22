import { CronJob, Message } from "@/types/cron"
import { Firebase } from "../firebase/Firebase"

const collectionName = "scheduler"
const methodField = "method"
const sourceField = "source"
const createdAtField = "createdAt"

const toDate = (isoDate: string) => isoDate.split("T")[0]

const logJob = async (method: string) => {
  const db = Firebase.getFirestore()
  const today = new Date().toISOString()

  await db
    .collection(collectionName)
    .doc(toDate(today))
    .set({
      [methodField]: method,
      [sourceField]: "cron",
      [createdAtField]: today,
    })

  return {
    message: "OK",
  }
}

const executeCron = async (method: string): Promise<Message> => {
  const result = await logJob(method)

  return result
}

const listCronHistory = async (): Promise<CronJob[]> => {
  const db = Firebase.getFirestore()
  const allRecords = await db.collection(collectionName).get()

  return allRecords.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      [methodField]: `${data[methodField]}`,
      [sourceField]: `${data[sourceField]}`,
      [createdAtField]: `${data[createdAtField]}`,
    }
  })
}

const getToday = async (): Promise<Message> => {
  const db = Firebase.getFirestore()
  const today = new Date().toISOString()
  const datedToday = toDate(today)

  const doc = await db.collection(collectionName).doc(datedToday).get()
  const data = doc.data()
  if (data !== undefined) {
    return {
      message: data[createdAtField],
    }
  } else {
    return {
      message: "Not Found",
      error: "Message not found",
    }
  }
}

export const execute = async (
  action: string | null | undefined,
  method: string = "GET"
): Promise<Message | CronJob[] | CronJob> => {
  switch (action) {
    case null:
    case undefined:
      return await listCronHistory()
    case "log":
      return await executeCron(method)
    case "today":
      return await getToday()
    default:
      return {
        message: "Only GET with action query of log",
        error: `(${action}) action not supported.`,
      }
  }
}
