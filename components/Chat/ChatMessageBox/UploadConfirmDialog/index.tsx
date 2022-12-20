import { useCallback } from "react"
import Modal from "../../../Modal"
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
    <Modal onCancel={onClick("no")} isModal={true}>
      <div className={style.container}>
        <p>This file will be shared publicly. Are you sure?</p>
        <div className={style.button}>
          <button onClick={onClick("yes")}>Yes</button>
          <button onClick={onClick("no")}>No</button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadConfirmDialog
