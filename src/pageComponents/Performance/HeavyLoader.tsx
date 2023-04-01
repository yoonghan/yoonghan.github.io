/* eslint-disable no-console */
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

const callProfiling = (id: string, phase: string, actualDuration: number) => {
  console.log(`${id} - ${phase}:${actualDuration}`)
}

const HeavyLoaderNoSSR = ({}) => {
  const [toggleState, setToggleState] = useState(false)
  const initializeRef = useRef(false)

  useEffect(() => {
    console.log("Start", window.performance.measure("Free"))
    console.log("Start", window.performance.measure("Callback"))
    console.log("Start", window.performance.measure("Memo"))
    console.log("Start", window.performance.measure("StaticFree"))
    console.log("Start", window.performance.measure("StaticCallback"))
    console.log("Start", window.performance.measure("StaticMemo"))
    initializeRef.current = true
  }, [])

  useEffect(() => {
    console.log(window.performance.measure("Free"))
    console.log(window.performance.measure("Callback"))
    console.log(window.performance.measure("Memo"))
    console.log(window.performance.measure("StaticFree"))
    console.log(window.performance.measure("StaticCallback"))
    console.log(window.performance.measure("StaticMemo"))
    window.performance.clearMarks()
    window.performance.clearMeasures()
  }, [toggleState])

  const renderFree = () => {
    if (initializeRef.current) {
      window.performance.mark("Free")
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }

  const renderCallback = useCallback(() => {
    if (initializeRef.current) {
      window.performance.mark("Callback")
      console.log(toggleState)
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }, [toggleState])

  const renderMemo = useMemo(() => {
    if (initializeRef.current) {
      window.performance.mark("Memo")
      console.log(toggleState)
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }, [toggleState])

  const staticRenderFree = () => {
    if (initializeRef.current) {
      window.performance.mark("StaticFree")
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }

  const staticRenderCallback = useCallback(() => {
    if (initializeRef.current) {
      window.performance.mark("StaticCallback")
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }, [])

  const staticRenderMemo = useMemo(() => {
    if (initializeRef.current) {
      window.performance.mark("StaticMemo")
      return arrayOfRecords.map((_, i) => <span key={`f_${i}`}>{i},</span>)
    }
    return []
  }, [])

  const onUpdate = useCallback(() => {
    setToggleState(!toggleState)
  }, [toggleState])

  return (
    <div>
      <p>
        This page will only work on &quot;Development&quot; environment where it
        profiles on the page rendering. Memo is the fastest.
      </p>
      <Profiler id="Free" onRender={callProfiling}>
        <strong>Free</strong>
        <div>{renderFree()}</div>
      </Profiler>
      <Profiler id="Callback" onRender={callProfiling}>
        <strong>Callback</strong>
        <div>{renderCallback()}</div>
      </Profiler>
      <Profiler id="Memo" onRender={callProfiling}>
        <strong>Memo</strong>
        <div>{renderMemo}</div>
      </Profiler>
      <Profiler id="StaticFree" onRender={callProfiling}>
        <strong>Static Free</strong>
        <div>{staticRenderFree()}</div>
      </Profiler>
      <Profiler id="StaticCallback" onRender={callProfiling}>
        <strong>Static Callback</strong>
        <div>{staticRenderCallback()}</div>
      </Profiler>
      <Profiler id="StaticMemo" onRender={callProfiling}>
        <strong>Static Memo</strong>
        <div>{staticRenderMemo}</div>
      </Profiler>
      <button onClick={onUpdate}>Retrigger</button>
    </div>
  )
}

export default HeavyLoaderNoSSR
