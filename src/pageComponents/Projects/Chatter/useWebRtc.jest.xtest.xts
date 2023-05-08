import { renderHook } from "@testing-library/react"
import "../../../__mocks__/webRtcMock"
import {
  addIceCandidateMock,
  setRemoteDescriptionMock,
  setLocalDescriptionMock,
  createOfferMock,
  createAnswerMock,
} from "../../../__mocks__/webRtcMock"
import { useWebRtc } from "./useWebRtc"

describe("useWebRtc", () => {
  it("should be able to initiate call, when there is a video", () => {
    const setRemoteStreamFn = jest.fn()
    const { result } = renderHook(useWebRtc, {
      initialProps: setRemoteStreamFn,
    })
    result.current.setupLocalVideo({
      getVideoTracks: () => ["one video"],
      getTracks: () => ["one track"],
    } as unknown as MediaStream)
    expect(setRemoteStreamFn).toBeCalledWith("Test")
  })

  it("should be able to initiate call, but reject answers and add ice candidate", () => {
    addIceCandidateMock.mockRejectedValueOnce("not ok")
    createOfferMock.mockRejectedValueOnce("not ok")
    createAnswerMock.mockRejectedValueOnce("not ok")

    const setRemoteStreamFn = jest.fn()

    const { result } = renderHook(useWebRtc, {
      initialProps: setRemoteStreamFn,
    })
    result.current.setupLocalVideo({
      getVideoTracks: () => ["one video"],
      getTracks: () => ["one track"],
    } as unknown as MediaStream)
    expect(setRemoteStreamFn).toBeCalledWith("Test")
  })

  it("should be able to initiate call, reject local and remote call", () => {
    setLocalDescriptionMock.mockRejectedValueOnce("not ok")
    setRemoteDescriptionMock.mockRejectedValueOnce("not ok")

    const setRemoteStreamFn = jest.fn()

    const { result } = renderHook(useWebRtc, {
      initialProps: setRemoteStreamFn,
    })
    result.current.setupLocalVideo({
      getVideoTracks: () => ["one video"],
      getTracks: () => ["one track"],
    } as unknown as MediaStream)
    expect(setRemoteStreamFn).toBeCalledWith("Test")
  })

  it("should be able to initiate call, but will not return remote stream", () => {
    const setRemoteStreamFn = jest.fn()
    const { result } = renderHook(useWebRtc, {
      initialProps: setRemoteStreamFn,
    })
    result.current.setupLocalVideo({
      getVideoTracks: () => [],
    } as unknown as MediaStream)
    expect(setRemoteStreamFn).not.toBeCalled()
  })
})
