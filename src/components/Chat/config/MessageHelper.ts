const linkRegex = new RegExp("^https?://\\S+$")

export const isALink = (message: string) => linkRegex.test(message)
