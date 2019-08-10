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
      return <InvalidCommand invalidCommand={"This is the page"}/>;
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
  synonym?: Array<string>;
}

export const AvailableInput:ICommand = {
  "whoami": {
    synonym: ["cd about", "cd /about"],
    description: "Get to know this site.",
    ...ABOUT_LINK
  },
  "su - walcron": {
    synonym: ["sudo su", "sudo walcron", "su -", "sudo su -"],
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
    synonym: ["dir", "cd creation", "cd /creation", "cd /invent"],
    description: "What's there ?",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      if(router.route === "/creation") {
        return <InvalidCommand invalidCommand={"This is the page"}/>;
      }
      router.push("/creation");
      return <React.Fragment/>;
    }
  },
  "exit": {
    description: "Return to main page",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      if(router.route === "/") {
        return <InvalidCommand invalidCommand={"Already at root"}/>;
      }
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
    synonym: ["cd"],
    description: "Return to main page",
    action: EnumAction.LINK,
    exec: (router: RouterProps) => {
      if(router.route === "/") {
        return <InvalidCommand invalidCommand={"Already at root"}/>;
      }
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
    synonym: ["man", "info"],
    action: EnumAction.COMMAND,
    exec: (element:HTMLDivElement, cancellationCallback:()=>void) => {
      return ReactDOM.createPortal(
        <HelpDialog cancelCallback={cancellationCallback}/>,
        element
      );
    }
  }
};
