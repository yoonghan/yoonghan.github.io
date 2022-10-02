import { useEffect } from "react"
import styles from "./EmailSender.module.css"

interface EmailSenderProps {
  writeTo: string
  writeFrom: string
}

const EmailSender = ({ writeTo, writeFrom }: EmailSenderProps) => {
  useEffect(() => {
    const subject = encodeURIComponent(`Contact from ${writeFrom} website`)
    const body = "Hello there, "

    window.location.href = `mailto:${writeTo}?subject=${subject}&body=${body}`
  }, [writeFrom, writeTo])

  return (
    <div className={styles.container}>
      Apologies that we do require you to use your own mailbox
    </div>
  )
}

export default EmailSender
