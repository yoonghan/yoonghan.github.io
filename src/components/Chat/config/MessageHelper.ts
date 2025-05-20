const linkRegex = /^https?:\/\/\S+$/

export const isALink = (message: string) => linkRegex.test(message)
