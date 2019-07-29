export enum EnumAction {
  COMMAND,
  LINK
}

const ABOUT_LINK = {
  action: EnumAction.LINK,
  url: "/about"
}

export interface ICommand {
  [s: string]: IAvailableInput;
}

export interface IAvailableInput {
  action: EnumAction;
  description: string;
  url?: string;
}

export const AvailableInput:ICommand = {
  "whoami": {
    description: "Get to know this site.",
    ...ABOUT_LINK
  },
  "sudo su -": {
    description: "Know us by being us.",
    ...ABOUT_LINK
  },
  "su - walcron": {
    description: "Know us by being us.",
    ...ABOUT_LINK
  },
  "su -": {
    description: "Know us by being us.",
    ...ABOUT_LINK
  },
  "pwd": {
    description: "Lost, and need direction.",
    action: EnumAction.COMMAND
  },
  "ls": {
    description: "What's there ?",
    action: EnumAction.COMMAND
  },
  "exit": {
    description: "Return to previous page",
    action: EnumAction.COMMAND
  },
  "help": {
    description: "Lost, confused, need help.",
    action: EnumAction.COMMAND
  }
};
