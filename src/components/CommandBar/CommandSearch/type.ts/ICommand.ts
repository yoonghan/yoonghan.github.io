export enum EnumAction {
  COMMAND,
  LINK,
}

export interface IAvailableInput {
  action: EnumAction
  description: string
  url?: string
  exec: any
  synonym?: Array<string>
}

export interface ICommand {
  [s: string]: IAvailableInput
}
