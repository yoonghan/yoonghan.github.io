import React from "react";
import ReactDOM from 'react-dom';
import HelpDialog from "./HelpDialog";
import PwaEnabler from "./PwaEnabler";
import InvalidCommand from "./InvalidCommand";
import Output from "./Output";

export enum EnumAction {
  COMMAND,
  LINK
}

const ABOUT_LINK = {
  action: EnumAction.LINK,
  url: "/about",
  exec: (router: any) => {
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
    exec: (router: any) => {
      return <Output output={router.route}/>;
    }
  },
  "ls": {
    synonym: ["dir", "cd creation", "cd /creation", "cd /invent", "cd showcase", "cd /showcase"],
    description: "What's there ?",
    action: EnumAction.LINK,
    exec: (router: any) => {
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
    exec: (router: any) => {
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
    exec: (router: any) => {
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
    exec: (router: any) => {
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
  "tribute": {
    synonym: ["thanks", "thank you"],
    description: "Gratitudes to organization and people.",
    action: EnumAction.LINK,
    url: "/tribute",
    exec: (router: any) => {
      if(router.route === "/tribute") {
        return <InvalidCommand invalidCommand={"This is the page"}/>;
      }
      router.push("/tribute");
      return <React.Fragment/>;
    }
  },
  "motivation": {
    synonym: ["books", "timeline"],
    description: "Self improvement.",
    action: EnumAction.LINK,
    url: "/motivation",
    exec: (router: any) => {
      if(router.route === "/motivation") {
        return <InvalidCommand invalidCommand={"This is the page"}/>;
      }
      router.push("/motivation");
      return <React.Fragment/>;
    }
  },
  "pwa": {
    description: "Enable PWA",
    synonym: ["offline"],
    action: EnumAction.COMMAND,
    exec: (element:HTMLDivElement, cancellationCallback:()=>void) => {
      return ReactDOM.createPortal(
        <PwaEnabler cancelCallback={cancellationCallback}/>,
        element
      );
    }
  },
  "status": {
    description: "Check api status (secret project)",
    action: EnumAction.COMMAND,
    exec: () => {window.open("/status"); return <React.Fragment/>}
  },
  "share": {
    description: "Spread our website!",
    synonym: ["twitter", "whatsapp", "facebook"],
    action: EnumAction.COMMAND,
    exec: () => {
      if(navigator.share) {
        navigator.share({
          "title": "Walcron",
          "text": "An awesome website.",
          "url": "https://www.walcron.com"
        });
        return <React.Fragment/>;
      }
      else {
        return (<InvalidCommand invalidCommand={"Couldn't run HTML5 share."}/>);
      }
    }
  },
  "help": {
    description: "Lost, confused, need help.",
    synonym: ["man", "info"],
    action: EnumAction.COMMAND,
    exec: (element:HTMLDivElement, cancellationCallback:()=>void, specialInputCallback:(input:string)=>void) => {
      return ReactDOM.createPortal(
        <HelpDialog cancelCallback={cancellationCallback} specialInputCallback={specialInputCallback}/>,
        element
      );
    }
  }
};
