import Dialog from "../../Dialog"
import { ICommand } from "../CommandSearch/type.ts/ICommand"
import HelpContent from "./content"

interface Props {
  onCancel: () => void
  specialInputCallback: (input: string) => void
  commands: ICommand
}

const HelpDialog = ({ onCancel, specialInputCallback, commands }: Props) => {
  const updateSelectedInput = (input: string) => {
    specialInputCallback(input)
    onCancel()
  }

  return (
    <Dialog onCancel={onCancel} nonPortal={false}>
      <HelpContent updateSelectedInput={updateSelectedInput} commands={commands}/>
    </Dialog>
  )
}

export default HelpDialog
