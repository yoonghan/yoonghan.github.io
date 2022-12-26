import Dialog from "@/components/Dialog"
import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useState } from "react"

const Dialogs = () => {
  const [showDialogNo, setShowDialogNo] = useState(0)

  return (
    <>
      <button onClick={() => setShowDialogNo(1)}>Show Dialog</button>
      <button onClick={() => setShowDialogNo(2)}>
        Show Confirmation Dialog
      </button>
      {showDialogNo === 1 && (
        <Dialog onCancel={() => setShowDialogNo(0)}>
          <div>HAHAHAHA, I Don&apos;t even have a background!</div>
        </Dialog>
      )}
      {showDialogNo === 2 && (
        <ConfirmationDialog
          title={"I am a title"}
          onNoClick={() => setShowDialogNo(0)}
          onYesClick={() => setShowDialogNo(0)}
          onCancel={() => setShowDialogNo(0)}
          message="Hello World, can you forgive us for the pollution caused?"
        />
      )}
    </>
  )
}

export default Dialogs
