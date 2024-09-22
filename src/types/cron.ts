export type CronJob = {
  id: string
  method: string
  source: string
  createdAt: string
}

export type Message = {
  message: string
  error?: unknown
}
