export const validInput = (value?: string) =>
  value !== undefined &&
  /^[a-z|A-Z|0-9|!|\$|@|?|#|%|\^]+$/.test(value) &&
  value.length >= 6

export const validEmail = (email: string) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
