import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useCallback, useMemo } from "react"
type ReplyGiven = "yes" | "no"

interface Props {
  onReplyClick: (yesOrNo: ReplyGiven) => void
}

const DownloadConfirmDialog = ({ onReplyClick }: Props) => {
  const onClick = useCallback(
    (reply: ReplyGiven) => () => {
      onReplyClick(reply)
    },
    [onReplyClick]
  )

  const onClickNo = useMemo(() => onClick("no"), [onClick])
  const onClickYes = useMemo(() => onClick("yes"), [onClick])

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
