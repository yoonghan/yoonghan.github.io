import Modal from "../../Modal"
import styles from "./Portal.module.css"

interface Props {
  onClose: (e?: any) => void
}

const Portal = ({ onClose }: Props) => {
  return (
    <Modal onCancel={onClose} isModal={false}>
      <div className={styles["container"]}>
        <p>
          Oops! You may only <strong>swipe/scroll</strong> <strong>up</strong>{" "}
          or <strong>down</strong>.
        </p>
        <p>(Tap anywhere to close this message)</p>
      </div>
    </Modal>
  )
}

export default Portal
