import { useState, useEffect, createRef, Fragment } from "react"
import Toggle from "react-toggle"
import Image from "next/image"
import Modal from "../../Modal"
import { usePwaHooks } from "./usePwaHooks"
import { isMacOrIOS } from "./utils/browserCheck"

interface Props {
  onCancel: () => void
}

const dialogContainerRef = createRef<HTMLDivElement>()
const DISABLED = "  Disabled" //count text.
const ENABLED = " Installed"
const PROCESS = "Processing"

const PwaEnabler = ({ onCancel }: Props) => {
  const [isProcessing, setProcessing] = useState(false)
  const [labelText, setLabelText] = useState(DISABLED)
  const [isEnabled, setEnabled] = useState(false)
  const [isShowSafariMsg, setShowSafariMsg] = useState(false)
  const [isRegistered, runRegistrationCheck, isTwaApp] = usePwaHooks(false)

  function onChangeEnabler() {
    setProcessing(true)
    setEnabled(!isEnabled)
    setLabelText(PROCESS)
  }

  const addToShortcutEvent = (e: any) => {
    e.preventDefault()
    e.prompt()
  }

  useEffect(() => {
    setProcessing(false)
    if (isRegistered) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
    setLabelText(isRegistered ? ENABLED : DISABLED)
  }, [isRegistered])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", addToShortcutEvent)

    return () => {
      window.removeEventListener("beforeinstallprompt", addToShortcutEvent)
    }
  }, [])

  useEffect(() => {
    if (isProcessing) {
      if (isEnabled) {
        ;(register as any)()
        _drawMessageForSafari()
      } else {
        ;(unregister as any)()
      }
      setTimeout(runRegistrationCheck, 1000)
    }
  }, [isEnabled, isProcessing])

  const _drawMessageForSafari = () => {
    if (isMacOrIOS()) {
      setShowSafariMsg(true)
    }
  }

  const _showSafariMsg = () => {
    if (isShowSafariMsg) {
      return (
        <div className={"safari-container"}>
          For Safari mobile users, follow these steps.
          <ol>
            <li>
              Tap on{" "}
              <Image
                src="/pwa/safari-share.png"
                className="icon"
                alt="safari-share"
              />{" "}
              (Share) icon.
            </li>
            <li>Then select (Add Home Screen).</li>
          </ol>
          <style jsx>{`
            .icon {
              width: auto;
              height: 20px;
            }
            .safari-container {
              margin-top: 20px;
              border-top: 1px solid;
              padding-top: 20px;
              opacity: 1;
              animation: fadein 2s linear;
            }

            @keyframes fadein {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )
    } else {
      return <Fragment />
    }
  }

  const _drawSelection = () => {
    if (!isTwaApp) {
      return (
        <div className={"toggle-container"}>
          <label>
            <Toggle
              id="toggle-pwa"
              disabled={isProcessing}
              checked={isEnabled}
              onChange={onChangeEnabler}
            />
            <span className={"label-text"}>{labelText}</span>
          </label>
          <style jsx>
            {`
              .toggle-container {
                text-align: center;
                margin-top: 2rem;
              }
              .label-text {
                margin-left: 1rem;
                vertical-align: middle;
                font-weight: normal;
                margin-bottom: 0;
              }
            `}
          </style>
        </div>
      )
    } else {
      return (
        <div className={"toggle-container"}>
          Trusted Web Application is detected, pwa is ENABLED.
          <style jsx>
            {`
              .toggle-container {
                text-align: center;
                margin-top: 2rem;
              }
            `}
          </style>
        </div>
      )
    }
  }

  return (
    <Modal onCancel={onCancel} isModal={true}>
      <div className={"container"} ref={dialogContainerRef}>
        <h4>Progressive Web App</h4>
        <div>
          Enable webpage to be browsed in even when offline. As of December 2019
          this feature only works on <strong>Chrome and Mozilla</strong>{" "}
          browsers.
          <br />
          <br />
          For <strong>Safari</strong> browsers, you are required to click add to
          homescreen manually.
        </div>

        {_drawSelection()}
        {_showSafariMsg()}
        <style jsx>
          {`
            .container {
              padding: 10px 10px 2rem 10px;
              color: #fff;
              background: var(--text);
              box-shadow: 5px 5px 2px var(--shadow);
            }
          `}
        </style>
      </div>
    </Modal>
  )
}

export default PwaEnabler
