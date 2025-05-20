import wrapPromise from "@/components/utils/common/wrapPromise"
import { Suspense } from "react"

const waitTime = 1000

const fakeSuccessResponse = async () => {
  const fakePromise: string = await new Promise((resolve, _) =>
    setTimeout(() => {
      resolve("I am done")
    }, waitTime - 500)
  )
  return fakePromise
}

const fakeFailResponse: () => Promise<Error> = async () => {
  return await new Promise((_, reject) =>
    setTimeout(() => {
      reject(new Error("I failed"))
    }, waitTime)
  )
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
  const catchAble = (response: { read: () => string | Error }) => {
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
      <i>
        <strong>TAKE NOTE:</strong> For suspend to load with lazy loading (i.e.
        NextJS dynamic), it is required to encapsulate it within
        &lt;Suspense&gt; tag.
      </i>
      <div>{readSuccessResponse}</div>
      <div>{`${readErrorResponse}`}</div>{" "}
      {/** Final render will take the longest time to complete */}
    </div>
  )
}

export default SuspenseLoader
