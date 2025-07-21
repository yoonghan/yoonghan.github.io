import { useCallback, useRef } from "react"

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
}

export const useWebRtc = (
  setRemoteStream: (stream: MediaStream) => void,
  errorCallback: (error: string) => void,
) => {
  const callerRef = useRef<RTCPeerConnection>()
  const remoteStream = useRef<MediaStream>()

  const acknowledgeAnswer = useCallback(
    (sdp: RTCSessionDescriptionInit) => {
      if (callerRef.current) {
        if (callerRef.current.localDescription) {
          callerRef.current.setRemoteDescription(sdp)
        } else {
          errorCallback("WebRtc offer needs to be provided first")
        }
      } else {
        errorCallback("WebRtc has not been initialized")
      }
    },
    [errorCallback],
  )

  const createOffer = useCallback(
    (trigger: (localDesc: RTCSessionDescriptionInit) => void) => {
      if (callerRef.current) {
        const caller = callerRef.current
        caller.createOffer(offerOptions).then(function (desc) {
          caller.setLocalDescription(desc)
          trigger(desc)
        })
      } else {
        errorCallback("WebRtc has not been initialized")
      }
    },
    [errorCallback],
  )

  const addOnTrack = useCallback(
    (event: RTCTrackEvent) => {
      const stream = remoteStream.current
      stream?.addTrack(event.track)
      if (event.streams?.length) {
        event.streams[0]?.getTracks().forEach((track) => {
          stream?.addTrack(track)
        })
      }
      stream && setRemoteStream(stream)
    },
    [setRemoteStream],
  )

  const initialize = useCallback(
    (
      stream: MediaStream,
      triggerCandidate: (eventCandidate: RTCIceCandidate) => void,
    ) => {
      if (stream.getVideoTracks().length > 0) {
        const caller = new RTCPeerConnection()
        callerRef.current = caller
        caller.onicecandidate = function (evt) {
          if (evt.candidate) {
            triggerCandidate(evt.candidate)
          }
        }

        remoteStream.current = new MediaStream()
        stream.getTracks().forEach((track) => {
          caller.addTrack(track, stream)
        })
        caller.ontrack = addOnTrack
      } else {
        errorCallback("No video")
      }
    },
    [addOnTrack, errorCallback],
  )

  const createAnswer = useCallback(
    (
      sdp: RTCSessionDescriptionInit,
      trigger: (answerSdp: RTCSessionDescriptionInit) => void,
    ) => {
      if (callerRef.current) {
        const caller = callerRef.current
        caller.setRemoteDescription(sdp)
        caller.createAnswer().then(function (answerSdp) {
          caller.setLocalDescription(answerSdp)
          trigger(answerSdp)
        })
      } else {
        errorCallback("WebRtc has not been initialized")
      }
    },
    [errorCallback],
  )

  const addIceCandidate = useCallback(
    (candidate: RTCIceCandidate) => {
      if (callerRef.current) {
        callerRef.current.addIceCandidate(candidate)
      } else {
        errorCallback("WebRtc has not been initialized")
      }
    },
    [errorCallback],
  )

  const disconnect = useCallback(() => {
    remoteStream.current?.getTracks()?.forEach((track) => {
      track.stop()
    })
    callerRef.current?.close()
  }, [])

  return {
    initialize,
    createOffer,
    acknowledgeAnswer,
    createAnswer,
    addIceCandidate,
    disconnect,
  }
}
