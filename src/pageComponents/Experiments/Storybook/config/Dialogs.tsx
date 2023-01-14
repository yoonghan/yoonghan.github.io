import Dialog from "@/components/Dialog"
import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useState } from "react"

import { confirmable, createConfirmation } from "react-confirm"

const Dialogs = () => {
  const [showDialogNo, setShowDialogNo] = useState(0)
  const DialogManual = (props: any) => {
    return (
      <Dialog onCancel={() => setShowDialogNo(0)}>
        <div>I am dialog 3 and I too do not even have a background!</div>
      </Dialog>
    )
  }

  const confirm = createConfirmation(confirmable(DialogManual))

  const showDialog3 = async () => {
    await confirm({
      confirmation: "Are you sure?",
    })
  }

  return (
    <>
      <button onClick={() => setShowDialogNo(1)}>Show Dialog</button>
      <button onClick={() => setShowDialogNo(2)}>
        Show Confirmation Dialog
      </button>
      <button onClick={showDialog3}>Show Dialog</button>
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
