import Button from "@/components/Button"
import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
} from "@/util/regex"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"

type Props = {
  senderButtonCanStop: boolean
  senderButtonDisabled: boolean
  callerButtonDisabled: boolean
  startStopSenderVideo: (username: string) => void
  startStopCallerVideo: () => void
}

const ChatterForm = ({
  senderButtonCanStop,
  senderButtonDisabled,
  callerButtonDisabled,
  startStopSenderVideo,
  startStopCallerVideo,
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
        isOnlyAlphabetsAndNumberAndSpace(nonWhiteSpaceUsername)
      ) {
        startStopSenderVideo(username)
      } else {
        setErrorMessage("Username can only contains alphabets and numbers.")
      }
    },
    [startStopSenderVideo, username]
  )

  return (
    <form onSubmit={onSubmitClick}>
      <fieldset>
        {errorMessage !== "" && (
          <div className={"alert danger"}>{errorMessage}</div>
        )}
        <label htmlFor="username">My user name:</label>
        <input type="text" id="username" onChange={onChangeUsername} />
      </fieldset>
      <Button
        styling={{ small: true, inverted: false }}
        additionalProps={{
          disabled: senderButtonDisabled, //videoStarted && stream == undefined,
        }}
      >
        {senderButtonCanStop ? "Stop" : "Start"}
      </Button>
      <Button
        onClick={startStopCallerVideo}
        styling={{ small: true, inverted: false }}
        additionalProps={{
          disabled:
            callerButtonDisabled ||
            senderButtonDisabled ||
            !senderButtonCanStop,
          // remoteStarted ||
          // !videoStarted ||
          // (videoStarted && stream == undefined),
        }}
      >
        Call
      </Button>
    </form>
  )
}

export default ChatterForm
