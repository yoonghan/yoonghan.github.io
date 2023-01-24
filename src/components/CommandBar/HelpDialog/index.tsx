import Dialog from "../../Dialog"
import HelpContent from "./content"

interface Props {
  onCancel: () => void
  specialInputCallback: (input: string) => void
}

const HelpDialog = ({ onCancel, specialInputCallback }: Props) => {
  const updateSelectedInput = (input: string) => {
    specialInputCallback(input)
    onCancel()
  }

  return (
    <Dialog onCancel={onCancel} nonPortal={false}>
      <HelpContent updateSelectedInput={updateSelectedInput} />
    </Dialog>
  )
}

export default HelpDialog
