export const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === "string") {
    return new Error(error)
  }
  if (typeof error === "object" && error !== null) {
    return new Error(JSON.stringify(error))
  }
  return new Error(String(error))
}
