import { MessageType } from "./MessageType"

export const encodeMessage = (message: string, messageType: MessageType) =>
  `${messageType}|${message}`

export const decodeMessage = (message: string) => {
  if (message.length > 2 && message.substring(1, 2) === "|") {
    return {
      messageType: message.substring(0, 1),
      message: message.substring(2),
    }
  } else {
    return {
      messageType: MessageType.TEXT,
      message: message,
    }
  }
}
