import Button from "@/components/Button"
import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
} from "@/util/regex"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import styles from "./ChatterForm.module.css"

type Props = {
  senderButtonCanStop: boolean
  senderButtonDisabled: boolean
  startStopSenderVideo: (username: string) => void
}

const ChatterForm = ({
  senderButtonCanStop,
  senderButtonDisabled,
  startStopSenderVideo,
}: Props) => {
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUsername(value)
    setErrorMessage("")
  }, [])

  const onSubmitClick = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const nonWhiteSpaceUsername = removeAllWhiteSpaces(username)
      if (
        nonWhiteSpaceUsername !== "" &&
        isOnlyAlphabetsAndNumberAndSpace(nonWhiteSpaceUsername) &&
        nonWhiteSpaceUsername.length > 2 &&
        nonWhiteSpaceUsername.length < 21
      ) {
        startStopSenderVideo(username)
      } else {
        setErrorMessage(
          "Username can only contains alphabets and numbers with 3 minimum words.",
        )
      }
    },
    [startStopSenderVideo, username],
  )

  return (
    <form onSubmit={onSubmitClick} className={styles.container}>
      <fieldset disabled={senderButtonCanStop}>
        {errorMessage !== "" && (
          <div className={"alert danger"}>{errorMessage}</div>
        )}
        <label htmlFor="username">My user name:</label>
        <input type="text" id="username" onChange={onChangeUsername} />
      </fieldset>
      <Button
        styling={{ small: false, inverted: true }}
        color={"blue"}
        additionalProps={{
          disabled: senderButtonDisabled, //videoStarted && stream == undefined,
        }}
      >
        {senderButtonCanStop ? "Stop" : "Start"}
      </Button>
    </form>
  )
}

export default ChatterForm
