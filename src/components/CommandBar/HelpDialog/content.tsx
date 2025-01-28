import Table from "@/components/Table"
import { AvailableInput } from "../CommandSearch/CommandSearch"
import { ReactNode } from "react"

interface Props {
  updateSelectedInput: (input: string) => void
}

const HelpContent = ({ updateSelectedInput }: Props) => {
  const onClick = (input: Record<string, ReactNode>) => {
    updateSelectedInput(input["Command"] as string)
  }

  const listsOfCommands = Object.keys(AvailableInput)
    .filter((input) => input !== "help")
    .map((input) => ({
      Command: input,
      Description: AvailableInput[input].description,
    }))

  return (
    <div className="p-8 bg-white drop-shadow-md">
      <h4>Help</h4>
      <Table
        headers={["Command", "Description"]}
        list={listsOfCommands}
        onClick={onClick}
      />
    </div>
  )
}

export default HelpContent
