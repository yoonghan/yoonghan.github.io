import Button from "@/components/Button"
import style from "./Recipient.module.css"

type Props = {
  recipients: Recipient[]
  recipientTriggered: (recipient: Recipient) => void
  disabled: boolean
}

export type Recipient = {
  id: string
  name: string
}

const RecipientList = ({ recipients, recipientTriggered, disabled }: Props) => {
  const callUser = (recipient: Recipient) => {
    recipientTriggered(recipient)
  }

  return (
    <div className={style.container}>
      <ul className={`u-list ${style.list}`}>
        {recipients.map((recipient) => (
          <li key={recipient.id}>
            <Button
              onClick={() => callUser(recipient)}
              styling={{ small: true, inverted: false }}
              additionalProps={{ disabled: disabled }}
            >
              Call {recipient.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipientList
