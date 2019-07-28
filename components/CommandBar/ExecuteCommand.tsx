import * as React from "react";
import ReactDOM from 'react-dom';
import HelpDialog from "./HelpDialog";
import InvalidInput from "./InvalidInput";
import { RouterProps } from "next-server/router";
import {AvailableInput, IAvailableInput, EnumAction} from "../../shared/CommandSearch";

interface ExtendedRouterProps {
}

export function exec(element:HTMLDivElement, cancellationCallback:()=>void, router:ExtendedRouterProps) {

  const executeBasedOnType = (inputCommand:string, inputSelected: IAvailableInput) => {
    switch(inputSelected.action) {
      case EnumAction.COMMAND:
        return executeCommand(inputCommand);
      case EnumAction.LINK:
        return executeLink(inputCommand);
      default:
        return <React.Fragment/>;
    }
  }

  const addHelp = () => {
    return ReactDOM.createPortal(
      <HelpDialog cancelCallback={cancellationCallback}/>,
      element
    );
  }

  const executeCommand = (inputCommand:string) => {
    switch(inputCommand) {
      case "help":
        return addHelp();
      default:
        console.warn(`Strange, can't execute this command:[${inputCommand}]`);
        return <React.Fragment/>;
    }
  }

  const executeLink = (inputCommand:string) => {
    let location = "";
    switch(inputCommand) {
      case "sudo su -":
      case "su - walcron":
      case "su -":
      case "whoami":
        location = "/about";
      default:
        console.warn(`Strange, can't execute this link:[${inputCommand}]`);
    }
    if(location !== "")
      (router as RouterProps).push(location);
    return <React.Fragment/>;
  }

  return function(inputCommand:string) {
    const _inputCommand = inputCommand.trim().toLowerCase();
    const matchedCommand:IAvailableInput = AvailableInput[_inputCommand];
    if(matchedCommand) {
      return executeBasedOnType(_inputCommand, matchedCommand);
    }
    else {
      return <InvalidInput invalidInput={inputCommand}/>
    }
  }
}
