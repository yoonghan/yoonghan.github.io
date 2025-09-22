import { act, renderHook } from "@testing-library/react"
import { useTrackReducer } from "./useTrackReducer"

describe("useTrackAggruseTrackReduceregrator", () => {
  it("should be able to provide initial data", () => {
    const { result } = renderHook(useTrackReducer, {
      initialProps: { initialData: [1, 2, 3] },
    })
    expect(result.current.data).toStrictEqual([1, 2, 3])
  })

  it("should be able to append data with default value", () => {
    const { result } = renderHook(useTrackReducer, { initialProps: {} })
    expect(result.current.data).toStrictEqual([])
    act(() => {
      result.current.append(4)
    })
    expect(result.current.data).toStrictEqual([4])
  })

  it("should be able to doNothing", () => {
    const { result } = renderHook(useTrackReducer, { initialProps: {} })
    expect(result.current.data).toStrictEqual([])
    act(() => {
      result.current.doNothing()
    })
    expect(result.current.data).toStrictEqual([])
  })

  it("should only append every allowStorageAfterMiliseconds time", async () => {
    jest.useFakeTimers()
    const { result } = renderHook(useTrackReducer, { initialProps: {} })
    expect(result.current.data).toStrictEqual([])
    act(() => {
      result.current.append(4)
    })
    expect(result.current.data).toStrictEqual([4])
    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.append(5)
      result.current.append(6) //skip immediate append.
    })
    expect(result.current.data).toStrictEqual([5, 4])
    jest.useRealTimers()
  })

  it("should store default maximum 10, and any new value will be replaced", () => {
    const arrayOf20Zeroes = Array(5).fill(0)
    const { result } = renderHook(useTrackReducer, {
      initialProps: { initialData: arrayOf20Zeroes, maxStorage: 5 },
    })
    act(() => {
      result.current.append(4)
    })
    expect(result.current.data).toStrictEqual([4, 0, 0, 0, 0])
  })
})
