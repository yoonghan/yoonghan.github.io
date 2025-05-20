import {
  useState,
  useEffect,
  createRef,
  Fragment,
  useMemo,
  useCallback,
} from "react"
import Toggle from "react-toggle"
import Image from "next/image"
import Dialog from "../../Dialog"
import { usePwaHooks } from "./usePwaHooks"
import { isAndroid, isMacOrIOS } from "./utils/browserCheck"
import { register, unregister } from "./utils/register"
import styles from "./PwaEnabler.module.css"
import Button from "../../Button"
import { ANDROID_PACKAGE_NAME } from "./utils/const"
import "../react-toggle.css"

interface Props {
  onCancel: () => void
}

const dialogContainerRef = createRef<HTMLDivElement>()
const DISABLED = "Disabled"
const ENABLED = "Installed"
const PROCESS = "Processing"

const PwaEnabler = ({ onCancel }: Props) => {
  const [isProcessing, setProcessing] = useState(false)
  const [labelText, setLabelText] = useState(DISABLED)
  const [isEnabled, setIsEnabled] = useState(false)
  const { isRegistered, getRegistration, isTwaApp } = usePwaHooks(false)

  const onChangeEnabler = useCallback(() => {
    setProcessing(true)
    setIsEnabled(!isEnabled)
    setLabelText(PROCESS)
  }, [isEnabled])

  useEffect(() => {
    setProcessing(false)
    if (isRegistered) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
    setLabelText(isRegistered ? ENABLED : DISABLED)
  }, [isRegistered])

  useEffect(() => {
    if (isProcessing) {
      if (isEnabled) {
        register()
      } else {
        unregister()
      }
      setTimeout(getRegistration, 1000)
    }
  }, [isEnabled, isProcessing, getRegistration])

  const drawnSafariMsg = useMemo(() => {
    if (isRegistered) {
      if (isAndroid()) {
        return (
          <div className={styles["mobile-container"]}>
            You can get our download too at: <br />
            <br />
            <Button
              href={`https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`}
              target="download"
            >
              <i className="fab fa-google-play"></i> Playstore Download
            </Button>
          </div>
        )
      }
      if (isMacOrIOS()) {
        return (
          <div className={styles["mobile-container"]}>
            For Safari mobile users, follow these steps.
            <ol>
              <li>
                Tap on{" "}
                <Image
                  src="/pwa/safari-share.png"
                  className={styles.icon}
                  alt="Sharing in Safari"
                  width={20}
                  height={33}
                />{" "}
                (Share) icon.
              </li>
              <li>Then select (Add Home Screen).</li>
            </ol>
          </div>
        )
      }
    }
    return <Fragment />
  }, [isRegistered])

  const drawnSelection = useMemo(() => {
    if (!isTwaApp) {
      return (
        <label>
          <Toggle
            id="toggle-pwa"
            disabled={isProcessing}
            checked={isEnabled}
            onChange={onChangeEnabler}
          />
          <span className={styles.labelText}>{labelText}</span>
        </label>
      )
    } else {
      return <span>Trusted Web Application is detected, pwa is ENABLED.</span>
    }
  }, [isEnabled, isProcessing, isTwaApp, labelText, onChangeEnabler])

  return (
    <Dialog onCancel={onCancel} nonPortal={false}>
      <div className={styles.container} ref={dialogContainerRef}>
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
        <div className={styles.toggleContainer}>{drawnSelection}</div>
        {drawnSafariMsg}
      </div>
    </Dialog>
  )
}

export default PwaEnabler
