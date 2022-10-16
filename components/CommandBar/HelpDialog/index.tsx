import Modal from "../../Modal"
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
    <Modal onCancel={onCancel} isModal={true}>
      <HelpContent updateSelectedInput={updateSelectedInput} />
    </Modal>
  )
}

export default HelpDialog
