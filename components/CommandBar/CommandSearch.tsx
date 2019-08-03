import * as React from "react";
import ReactDOM from 'react-dom';
import { RouterProps } from "next-server/router";
import HelpDialog from "./HelpDialog";
import InvalidCommand from "./InvalidCommand";
import Output from "./Output";

export enum EnumAction {
  COMMAND,
  LINK
}

const ABOUT_LINK = {
  action: EnumAction.LINK,
  url: "/about",
  exec: (router: RouterProps) => {
    if(router.route === "/about") {
      return <InvalidCommand invalidCommand={"At path"}/>;
    }
    router.push("/about");
    return <React.Fragment/>;
  }
}

export interface ICommand {
  [s: string]: IAvailableInput;
}

export interface IAvailableInput {
  action: EnumAction;
  description: string;
  url?: string;
  exec: any;
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
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      return <Output output={router.route}/>;
    }
  },
  "ls": {
    description: "What's there ?",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      if(router.route === "/creation") {
        return <InvalidCommand invalidCommand={"At path"}/>;
      }
      router.push("/creation");
      return <React.Fragment/>;
    }
  },
  "exit": {
    description: "Return to previous page",
    action: EnumAction.COMMAND,
    exec: () => {
      location.href="/";
      return <React.Fragment/>;
    }
  },
  "cd ..": {
    description: "Return to previous page",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      if(router.route !== "/") {
        router.back();
        return <React.Fragment/>
      }
      else
        return <InvalidCommand invalidCommand={"Already at root"}/>
    }
  },
  "cd /": {
    description: "Return to main page",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      router.push("/");
      return <React.Fragment/>;
    }
  },
  "=": {
    description: "Do Math",
    action: EnumAction.COMMAND,
    exec: () => <InvalidCommand invalidCommand={"Provide an equation"}/>
  },
  "help": {
    description: "Lost, confused, need help.",
    action: EnumAction.COMMAND,
    exec: (element:HTMLDivElement, cancellationCallback:()=>void) => {
      return ReactDOM.createPortal(
        <HelpDialog cancelCallback={cancellationCallback}/>,
        element
      );
    }
  }
};
