import Button from "@/components/Button"
import style from "./Recipient.module.css"

type Props = {
  recipients: Recipient[]
  recipientTriggered: (recipient: Recipient) => void
}

export type Recipient = {
  id: string
  name: string
}

const RecipientList = ({ recipients, recipientTriggered }: Props) => {
  const callUser = (recipient: Recipient) => {
    recipientTriggered(recipient)
  }

  return (
    <div className={style.container}>
      Users online:
      <ul className={`u-list ${style.list}`}>
        {recipients.map((recipient) => (
          <li key={recipient.id}>
            <Button
              onClick={() => callUser(recipient)}
              styling={{ small: true, inverted: false }}
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
