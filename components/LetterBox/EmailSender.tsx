interface EmailSenderProps {
  writeTo: string
  writeFrom: string
}

const EmailSender = ({ writeTo, writeFrom }: EmailSenderProps) => {
  const _openMailSender = (writeTo: string, writeFrom: string) => {
    const subject = encodeURIComponent(`Contact from ${writeFrom} website`)
    const body = "Hello there, "

    window.location.href = `mailto:${writeTo}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container">
      Apologies that we do require you to use your own mailbox
      <style jsx>{`
        .container {
          padding: 50px;
          background: #fff;
          color: #000;
          border-radius: 3px;
          min-width: 150px;
        }
      `}</style>
    </div>
  )
}

export default EmailSender
