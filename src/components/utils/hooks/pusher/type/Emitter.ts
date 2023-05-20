export type EventEmitter = (message: string, senderId: number) => boolean
export type NoOfUserEmitter = (subscription_count: number) => boolean
export type Emitter = EventEmitter | NoOfUserEmitter

export const isEventEmitter = (
  function1: Emitter
): function1 is EventEmitter => {
  return function1.length === 2
}

export const isNoOfUserEmitter = (
  function1: Emitter
): function1 is NoOfUserEmitter => {
  return function1.length === 1
}
