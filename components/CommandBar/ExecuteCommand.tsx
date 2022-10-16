import * as React from "react"
import InvalidInput from "./InvalidInput"
import InvalidCommand from "./CommandSearch/InvalidCommand"
import Output from "./CommandSearch/Output"
import { NextRouter } from "next/router"
import {
  AvailableInput,
  IAvailableInput,
  EnumAction,
} from "./CommandSearch/CommandSearch"
import * as ts from "typescript"

function evaluateMath(mathEval: string): string {
  const result = ts.transpile(mathEval)
  const evaluatedResult: any = eval(result)
  return evaluatedResult
}

function getMathEvaluation(evaluation: string) {
  const equalsLocation = 1
  const _evaluation = evaluation.replace(/ /g, "").substr(equalsLocation)

  const mathRegex = /^[0-9]+(\.[0-9]*)?((\+|\-|\*|\/)[0-9]+(\.[0-9]*)?)+$/
  const matches = mathRegex.test(_evaluation)

  if (matches) {
    const result = evaluateMath(_evaluation)
    return <Output output={result} />
  } else {
    return <InvalidCommand invalidCommand={"Unable to evaluate."} />
  }
}

function isSpecialCommand(inputCommand: string) {
  return inputCommand.indexOf("=") === 0 && inputCommand.length > 3
}

export function exec(
  element: HTMLDivElement,
  cancellationCallback: () => void,
  router?: NextRouter,
  specialInputCallback?: (input: string) => void
) {
  const executeBasedOnType = (
    inputCommand: string,
    inputSelected: IAvailableInput
  ) => {
    switch (inputSelected.action) {
      case EnumAction.COMMAND:
        return executeCommand(inputCommand)
      case EnumAction.LINK:
        return executeLink(inputCommand)
    }
  }

  const executeCommand = (inputCommand: string) => {
    return AvailableInput[inputCommand].exec(
      element,
      cancellationCallback,
      specialInputCallback
    )
  }

  const executeLink = (inputCommand: string) => {
    if (router) return AvailableInput[inputCommand].exec(router)
  }

  /**
   * Convert to understandable commands.
   **/
  const findInputSynonym = (inputCommand: string) => {
    if (AvailableInput[inputCommand]) {
      return inputCommand
    } else {
      return findClosestInputMatch(inputCommand)
    }
  }

  const findClosestInputMatch = (inputCommand: string) => {
    //Cache it? Naw, too little to do that.
    for (let key in AvailableInput) {
      const synonym = AvailableInput[key].synonym
      if (synonym) {
        const found = synonym.find((elem) => elem === inputCommand)
        if (found) {
          return key
        }
      }
    }
    return inputCommand
  }

  return function ExecuteCommand(inputCommand: string) {
    const trimmedCommand = inputCommand.trim().toLocaleLowerCase()
    if (trimmedCommand === "") {
      return undefined
    }
    const _inputCommand = findInputSynonym(trimmedCommand)
    const matchedCommand: IAvailableInput = AvailableInput[_inputCommand]
    if (matchedCommand) {
      return executeBasedOnType(_inputCommand, matchedCommand)
    }
    if (isSpecialCommand(_inputCommand)) {
      return getMathEvaluation(_inputCommand)
    }
    return <InvalidInput invalidInput={inputCommand} />
  }
}
