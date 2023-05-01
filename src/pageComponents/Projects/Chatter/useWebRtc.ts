import { useCallback } from "react"

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
}

export const useWebRtc = (setRemoteStream: (e: RTCTrackEvent) => void) => {
  const onAddIceCandidateSuccess = (pc: RTCPeerConnection) => {}

  const onAddIceCandidateError = (pc: RTCPeerConnection, error: unknown) => {}

  const onIceCandidate = useCallback(
    (
      pc: RTCPeerConnection,
      event: RTCPeerConnectionIceEvent,
      otherPc?: RTCPeerConnection
    ) => {
      if (otherPc !== undefined && event.candidate !== null) {
        otherPc.addIceCandidate(event.candidate).then(
          function () {
            onAddIceCandidateSuccess(pc)
          },
          function (err) {
            onAddIceCandidateError(pc, err)
          }
        )
      }
    },
    []
  )

  const onSetSessionDescriptionError = (reason: any) => {
    //dispatchMessage({ type: "ADD ERROR", message: `${reason}` })
  }

  const onSetSuccess = (reason: any) => {
    //dispatchMessage({ type: "ADD SUCCESS", message: `${reason}` })
  }

  const onCreateAnswerSuccess = useCallback(
    (pc1: RTCPeerConnection, pc2: RTCPeerConnection) =>
      (desc: RTCSessionDescriptionInit) => {
        pc2.setLocalDescription(desc).then(function () {
          onSetSuccess(pc2)
        }, onSetSessionDescriptionError)
        pc1.setRemoteDescription(desc).then(function () {
          onSetSuccess(pc1)
        }, onSetSessionDescriptionError)
      },
    []
  )

  const onCreateSessionDescriptionError = (error: unknown) => {}

  const onCreateOfferSuccess = useCallback(
    (pc1: RTCPeerConnection, pc2: RTCPeerConnection) =>
      (desc: RTCSessionDescriptionInit) => {
        pc1.setLocalDescription(desc).then(function () {
          onSetSuccess(pc1)
        }, onSetSessionDescriptionError)
        pc2.setRemoteDescription(desc).then(function () {
          onSetSuccess(pc2)
        }, onSetSessionDescriptionError)
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        pc2
          .createAnswer()
          .then(
            onCreateAnswerSuccess(pc1, pc2),
            onCreateSessionDescriptionError
          )
      },
    [onCreateAnswerSuccess]
  )

  const callVideo = useCallback(
    (stream: MediaStream) => {
      if (stream.getVideoTracks().length > 0) {
        var servers = undefined
        const pc1 = new RTCPeerConnection(servers)
        pc1.onicecandidate = function (e) {
          onIceCandidate(pc1, e, undefined)
        }
        const pc2 = new RTCPeerConnection(servers)
        pc2.onicecandidate = function (e) {
          onIceCandidate(pc2, e, pc1)
        }
        pc1.oniceconnectionstatechange = function (e: Event) {}
        pc2.oniceconnectionstatechange = function (e: Event) {}

        pc2.addEventListener("track", setRemoteStream, false)

        stream.getTracks().forEach((track) => pc1.addTrack(track))

        pc1
          .createOffer(offerOptions)
          .then(onCreateOfferSuccess(pc1, pc2), onCreateSessionDescriptionError)
      }
    },
    [onCreateOfferSuccess, onIceCandidate, setRemoteStream]
  )

  return {
    callVideo,
  }
}
