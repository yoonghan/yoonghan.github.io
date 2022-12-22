import { useCallback } from "react"
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

  return (
    <Dialog onCancel={onClick("no")} isNotModal={true}>
      <div className={style.container}>
        This file will be shared publicly. Are you sure?
        <div className={style.button}>
          <button onClick={onClick("yes")} className={style.primary}>
            Yes
          </button>
          <button onClick={onClick("no")}>No</button>
        </div>
      </div>
    </Dialog>
  )
}

export default UploadConfirmDialog
