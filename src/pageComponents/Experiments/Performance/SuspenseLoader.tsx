import wrapPromise from "@/components/utils/common/wrapPromise"
import { Suspense } from "react"

const waitTime = 2000

const fakeSuccessResponse = async () => {
  const fakePromise: string = await new Promise((resolve, _) =>
    setTimeout(() => {
      resolve("I am done")
    }, waitTime - 1000)
  )
  return fakePromise
}

const fakeFailResponse = async () => {
  return (await new Promise((_, reject) =>
    setTimeout(() => {
      reject("I failed")
    }, waitTime)
  )) as string
}

const successResponse = wrapPromise(fakeSuccessResponse())
const failResponse = wrapPromise(fakeFailResponse())

const SuspenseLoader = () => {
  return (
    <div>
      <span>Demo of React 18 to wait: {waitTime} miliseconds</span>
      <Suspense
        fallback={<div style={{ color: "green" }}>Waiting Success</div>}
      >
        <Result />
      </Suspense>
    </div>
  )
}

const Result = () => {
  const catchAble = (response: { read: () => string }) => {
    try {
      return response.read()
    } catch (e: any) {
      if (typeof e?.then === "function") {
        //It throws first time because a promise is returned
        throw e
      }
      return e
    }
  }

  const readSuccessResponse = catchAble(successResponse)
  const readErrorResponse = catchAble(failResponse)
  /*
   * const readSuccessResponse = wrapPromise(fakeSuccessResponse).read();
   * Cannot be directly written in Component as it will result an infinite loop due to the variable getting reassigned.
   * Cannot use useMemo as well, as the first assignment is thrown.
   */

  return (
    <div>
      <div>{readSuccessResponse}</div>
      <div>{readErrorResponse}</div>{" "}
      {/** Final render will take the longest time to complete */}
    </div>
  )
}

export default SuspenseLoader
