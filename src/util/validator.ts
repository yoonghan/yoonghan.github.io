const inputRegex = /^[a-z|A-Z|0-9|!|\$|@|?|#|%|\^]{6,50}$/

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validInput = (value?: string) =>
  value ? inputRegex.test(value) : false

export const validEmail = (email: string) => emailRegex.test(email)
