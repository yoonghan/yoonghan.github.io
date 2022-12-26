import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useCallback, useMemo } from "react"
import Dialog from "../../../Dialog"
import style from "./UploadConfirmDialog.module.css"

type ReplyGiven = "yes" | "no"

interface Props {
  onReplyClick: (yesOrNo: ReplyGiven) => void
}

const UploadConfirmDialog = ({ onReplyClick }: Props) => {
  const onClick = useCallback(
    (reply: ReplyGiven) => () => {
      onReplyClick(reply)
    },
    [onReplyClick]
  )

  const onClickNo = useMemo(() => onClick("no"), [onClick])
  const onClickYes = useMemo(() => onClick("yes"), [onClick])

  return (
    <Dialog onCancel={onClick("no")} isNotModal={true}>
      <ConfirmationDialog
        title="Upload File"
        onCancel={onClickNo}
        onNoClick={onClickNo}
        onYesClick={onClickYes}
        message="This file will be shared publicly. Are you sure?"
      />
    </Dialog>
  )
}

export default UploadConfirmDialog
