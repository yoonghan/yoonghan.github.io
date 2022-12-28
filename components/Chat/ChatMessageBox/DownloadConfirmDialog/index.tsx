import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useCallback, useMemo } from "react"
import Dialog from "../../../Dialog"

type ReplyGiven = "yes" | "no"

interface Props {
  onReplyClick: (yesOrNo: ReplyGiven) => void
}

const DownloadConfirmDialog = ({ onReplyClick }: Props) => {
  const onClick = (reply: ReplyGiven) => () => {
    onReplyClick(reply)
  }

  const onClickNo = onClick("no")
  const onClickYes = onClick("yes")

  return (
    <ConfirmationDialog
      title="Download Unverified File"
      onCancel={onClickNo}
      onNoClick={onClickNo}
      onYesClick={onClickYes}
      message="It's a public file and may contain malicious content. Are you sure you want to download it?"
    />
  )
}

export default DownloadConfirmDialog
