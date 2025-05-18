const inputRegex = /^[a-zA-Z0-9!$@?#%^]{6,50}$/

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validInput = (value) => (value ? inputRegex.test(value) : false)

export const validEmail = (email) => emailRegex.test(email)
