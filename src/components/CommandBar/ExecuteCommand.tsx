import * as React from "react"
import InvalidInput from "./InvalidInput"
import InvalidCommand from "./CommandSearch/InvalidCommand"
import Output from "./CommandSearch/Output"
import {
  AvailableInput,
  IAvailableInput,
  EnumAction,
} from "./CommandSearch/CommandSearch"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import HelpDialog from "./HelpDialog"
import { createPortal } from "react-dom"

function evaluateMath(mathEval: string): string {
  const evaluatedResult = Function(`"use strict";return ${mathEval}`)()
  return evaluatedResult
}

function getMathEvaluation(evaluation: string) {
  const equalsLocation = 1
  const _evaluation = evaluation.replace(/ /g, "").substring(equalsLocation)

  const mathRegex = /^\d+(\.\d*)?([+\-*/]\d+(\.\d*)?)+$/
  const matches = mathRegex.test(_evaluation)

  if (matches) {
    const result = evaluateMath(_evaluation)
    return <Output output={result} />
  } else {
    return <InvalidCommand invalidCommand={"Unable to evaluate."} />
  }
}

function isSpecialCommand(inputCommand: string) {
  return inputCommand.startsWith("=") && inputCommand.length > 3
}

export function exec(
  element: HTMLDivElement,
  cancellationCallback: () => void,
  router: AppRouterInstance,
  currentPath?: string | null,
  specialInputCallback?: (input: string) => void,
) {
  const executeBasedOnType = (
    inputCommand: string,
    inputSelected: IAvailableInput,
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
      specialInputCallback,
    )
  }

  const executeLink = (inputCommand: string) => {
    return AvailableInput[inputCommand].exec(router, currentPath)
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

  const createHelpPortal = () =>
    createPortal(
      <HelpDialog
        onCancel={cancellationCallback}
        specialInputCallback={specialInputCallback}
      />,
      element,
    )

  return function ExecuteCommand(inputCommand: string) {
    const trimmedCommand = inputCommand.trim().toLocaleLowerCase()
    if (trimmedCommand === "") {
      return undefined
    }

    if (trimmedCommand === "help" || trimmedCommand === "man") {
      return createHelpPortal()
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
