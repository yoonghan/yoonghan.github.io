import { AvailableInput } from "../CommandSearch/CommandSearch"
import styles from "./HelpDialog.module.css"

interface Props {
  updateSelectedInput: (input: string) => void
}

const HelpContent = ({ updateSelectedInput }: Props) => {
  return (
    <div className={styles.container}>
      <h4>Help</h4>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(AvailableInput).map((input, idx) => (
            <tr
              key={`helpdialog_${idx}`}
              onClick={() => {
                updateSelectedInput(input)
              }}
            >
              <td>{input}</td>
              <td>{AvailableInput[input].description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HelpContent
