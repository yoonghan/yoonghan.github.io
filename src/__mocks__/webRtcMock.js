export const addIceCandidateMock = jest.fn()
addIceCandidateMock.mockResolvedValue("ok")

export const setRemoteDescriptionMock = jest.fn()
setRemoteDescriptionMock.mockResolvedValue("ok")

export const setLocalDescriptionMock = jest.fn()
setLocalDescriptionMock.mockResolvedValue("ok")

export const createAnswerMock = jest.fn()
createAnswerMock.mockResolvedValue("ok")

export const createOfferMock = jest.fn()
createOfferMock.mockResolvedValue("ok")

class RTCPeerConnection {
  constructor() {}

  addEventListener = (event, listener, option) => {
    this.onicecandidate({
      candidate: "",
    })
    this.oniceconnectionstatechange()
    listener("Test")
  }

  addTrack = () => {
    this.onicecandidate({
      candidate: "",
    })
    this.oniceconnectionstatechange()
  }

  addIceCandidate = addIceCandidateMock

  createOffer = createOfferMock

  setLocalDescription = setLocalDescriptionMock

  setRemoteDescription = setRemoteDescriptionMock

  createAnswer = createAnswerMock
}

global.RTCPeerConnection = RTCPeerConnection
