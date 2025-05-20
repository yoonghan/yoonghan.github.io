import { Message } from "react-bell-chat"
import { encodeMessage } from "../../../config/MessageFormatter"
import { MessageType } from "../../../config/MessageType"

export enum MessageActionType {
  Add,
  Default,
}

type MessageAction = {
  type: MessageActionType
  payload: {
    type: MessageType
    message: string
    authorId?: number
  }
}

export const messageReducerInitialState: Message[] = []

export const messageReducer = (state: Message[], action: MessageAction) => {
  if (action.type === MessageActionType.Add) {
    return [
      ...state,
      {
        id: state.length,
        createdOn: new Date(),
        isSend: true,
        authorId: action.payload.authorId,
        message: encodeMessage(action.payload.message, action.payload.type),
      },
    ]
  }

  return state
}
