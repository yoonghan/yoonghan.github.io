import { renderHook, waitFor } from "@testing-library/react"
import "@/__tests__/mocks/webRtcMock"
import {
  setRemoteDescriptionMock,
  setLocalDescriptionMock,
  closeMock,
} from "@/__tests__/mocks/webRtcMock"
import { useWebRtc } from "."

describe("useWebRtc", () => {
  it("should be fail to initiate call, when there is no video", () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    result.current.initialize(new MediaStream(), () => {})
    expect(errorCallbackFn).toBeCalledWith("No video")
  })

  it("should be able initiate call as requestor, when there is a video", async () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const triggerAnswerFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    const mediaStream = new MediaStream()
    mediaStream.addTrack(new MediaStreamTrack())

    const sdp = new RTCSessionDescription("" as any)

    result.current.initialize(mediaStream, () => {})
    result.current.createAnswer(sdp, triggerAnswerFn)
    await waitFor(async () => {
      expect(triggerAnswerFn).toHaveBeenCalledWith("answer sdp")
    })
    expect(setRemoteDescriptionMock).toHaveBeenCalledWith(sdp)
    expect(setLocalDescriptionMock).toHaveBeenCalledWith("answer sdp")

    expect(errorCallbackFn).not.toBeCalledWith()
    result.current.disconnect()
  })

  it("should be able initiate call as answerer, when there is a video", async () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const triggerOfferFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    const mediaStream = new MediaStream()
    mediaStream.addTrack(new MediaStreamTrack())
    const sdp = new RTCSessionDescription("" as any)
    const iceCandidate = new RTCIceCandidate("" as any)

    result.current.initialize(mediaStream, () => {})
    result.current.createOffer(triggerOfferFn)
    await waitFor(async () => {
      expect(triggerOfferFn).toHaveBeenCalledWith("offer sdp")
    })
    expect(setLocalDescriptionMock).toHaveBeenCalledWith("offer sdp")

    result.current.acknowledgeAnswer(sdp)
    result.current.addIceCandidate(iceCandidate)
    expect(setRemoteDescriptionMock).toHaveBeenCalledWith(sdp)

    expect(errorCallbackFn).not.toBeCalledWith()
    result.current.disconnect()
  })

  it("should throw exception if initiate has not been triggered", () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    const { current } = result

    const sdp = new RTCSessionDescription("" as any)
    const iceCandidate = new RTCIceCandidate("" as any)

    current.addIceCandidate(iceCandidate)
    expect(errorCallbackFn).toHaveBeenLastCalledWith(
      "WebRtc has not been initialized"
    )
    current.createAnswer(sdp, () => {})
    expect(errorCallbackFn).toHaveBeenLastCalledWith(
      "WebRtc has not been initialized"
    )
    current.createOffer(() => {})
    expect(errorCallbackFn).toHaveBeenLastCalledWith(
      "WebRtc has not been initialized"
    )
    current.acknowledgeAnswer(sdp)
    expect(errorCallbackFn).toHaveBeenLastCalledWith(
      "WebRtc has not been initialized"
    )
  })

  it("should only allow to acknowledge answer if offer is set", () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    const { current } = result

    const mediaStream = new MediaStream()
    mediaStream.addTrack(new MediaStreamTrack())
    const sdp = new RTCSessionDescription("" as any)

    result.current.initialize(mediaStream, () => {})
    current.acknowledgeAnswer(sdp)
    expect(errorCallbackFn).toHaveBeenLastCalledWith(
      "WebRtc offer needs to be provided first"
    )
  })

  it("should close connection when disconneced", () => {
    const setRemoteStreamFn = jest.fn()
    const errorCallbackFn = jest.fn()
    const { result } = renderHook(
      ({ setRemoteStreamFn, errorCallbackFn }) =>
        useWebRtc(setRemoteStreamFn, errorCallbackFn),
      {
        initialProps: { setRemoteStreamFn, errorCallbackFn },
      }
    )
    const mediaStream = new MediaStream()
    mediaStream.addTrack(new MediaStreamTrack())
    result.current.initialize(mediaStream, () => {})
    result.current.disconnect()
    expect(closeMock).toHaveBeenCalled()
  })
})
