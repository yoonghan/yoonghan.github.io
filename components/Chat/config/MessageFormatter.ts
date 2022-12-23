import { MessageType } from "./MessageType"

export const encodeMessage = (message: string, messageType: MessageType) =>
  `${messageType}|${message}`

export const decodeMessage = (message: string) => ({
  messageType: message.substring(0, 1),
  message: message.substring(2),
})
