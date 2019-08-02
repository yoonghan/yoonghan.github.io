import * as React from "react";
import InvalidInput from "./InvalidInput";
import InvalidCommand from "./InvalidCommand";
import Output from "./Output";
import {AvailableInput, IAvailableInput, EnumAction} from "./CommandSearch";
import * as ts from "typescript";

interface ExtendedRouterProps {
}


function evaluateMath(mathEval: string):string {
  // const code: string = `({
  //   Run: (data: string): string => {
  //       console.log(data); return Promise.resolve("SUCCESS"); }
  //   })`;

  const result = ts.transpile(mathEval);
  const evaluatedResult :any = eval(result);
  // runnalbe.Run("RUN!").then((result:string)=>{console.log(result);});
  return evaluatedResult;
}

function getMathEvaluation(evaluation: string) {
  const equalsLocation = 1;
  const _evaluation = evaluation.replace(/ /g,'').substr(equalsLocation);

  const mathRegex = /^[0-9]+(\.[0-9]*)?((\+|\-|\*|\/)[0-9]+(\.[0-9]*)?)+$/;
  const matches = mathRegex.test(_evaluation);

  if(matches) {
    const result = evaluateMath(_evaluation);
    return <Output output={result}/>
  }
  else {
    return <InvalidCommand invalidCommand={"Unable to evaluate."}/>;
  }
}

function isSpecialCommand(inputCommand:string) {
  return (inputCommand.indexOf('=') === 0 && inputCommand.length > 3);
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

  const executeCommand = (inputCommand:string) => {
    return AvailableInput[inputCommand].exec(element, cancellationCallback);
  }

  const executeLink = (inputCommand:string) => {
    return AvailableInput[inputCommand].exec(router);
  }

  return function(inputCommand:string) {
    const _inputCommand = inputCommand.trim().toLowerCase();
    const matchedCommand:IAvailableInput = AvailableInput[_inputCommand];
    if(matchedCommand) {
      return executeBasedOnType(_inputCommand, matchedCommand);
    }
    else if(isSpecialCommand(inputCommand)) {
      return getMathEvaluation(inputCommand);
    }
    else {
      return <InvalidInput invalidInput={inputCommand}/>
    }
  }
}
