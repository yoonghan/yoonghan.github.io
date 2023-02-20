/* eslint-disable no-console */
import styles from "@/pageComponents/Projects/Projects.module.css"
import {
  Profiler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const genCount = 10000
const arrayOfRecords = Array.from({ length: genCount }, (i) => i) as number[]

const HeavyLoaderNoSSR = ({}) => {
  const [toggleState, setToggleState] = useState(false)
  const initializeRef = useRef(false)

  useEffect(() => {
    initializeRef.current = true
  }, [toggleState])

  useEffect(() => {
    console.log(window.performance.measure("Free"))
    console.log(window.performance.measure("Callback"))
    console.log(window.performance.measure("Memo"))
    window.performance.clearMarks()
    window.performance.clearMeasures()
  }, [toggleState])

  const renderFree = () => {
    console.log("update Free")
    if (initializeRef.current) {
      window.performance.mark("Free")
    }
    return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
  }

  const renderCallback = useCallback(() => {
    if (initializeRef.current) {
      window.performance.mark("Callback")
    }
    console.log(toggleState)
    return arrayOfRecords.map((_, i) => <span key={`c_${i}`}>{i},</span>)
  }, [toggleState])

  const renderMemo = useMemo(() => {
    if (initializeRef.current) {
      window.performance.mark("Memo")
    }
    console.log(toggleState)
    return arrayOfRecords.map((_, i) => <span key={`m_${i}`}>{i},</span>)
  }, [toggleState])

  const callProfiling = (id: string, phase: string, actualDuration: number) => {
    console.log(`${id} - ${phase}:${actualDuration}`)
  }

  const onUpdate = useCallback(() => {
    setToggleState(!toggleState)
  }, [toggleState])

  return (
    <div className={styles.container}>
      <p>
        This page will only work on &quot;Development&quot; environment where it
        profiles on the page rendering.
      </p>
      <Profiler id="Free" onRender={callProfiling}>
        <strong>Free</strong>
        <div className={styles.wrappedText}>{renderFree()}</div>
      </Profiler>
      <Profiler id="Callback" onRender={callProfiling}>
        <strong>Callback</strong>
        <div className={styles.wrappedText}>{renderCallback()}</div>
      </Profiler>
      <Profiler id="Memo" onRender={callProfiling}>
        <strong>Memo</strong>
        <div className={styles.wrappedText}>{renderMemo}</div>
      </Profiler>
      <button onClick={onUpdate}>Retrigger</button>
    </div>
  )
}

export default HeavyLoaderNoSSR
