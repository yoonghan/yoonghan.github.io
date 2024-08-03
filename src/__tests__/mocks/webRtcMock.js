export const setRemoteDescriptionMock = jest.fn()

export const setLocalDescriptionMock = jest.fn()

export const createAnswerMock = jest.fn()
createAnswerMock.mockReturnValueOnce("answer sdp")

export const createOfferMock = jest.fn()
createOfferMock.mockResolvedValue("offer sdp")

export const closeMock = jest.fn()

class MediaStream {
  video = []
  track = []

  getVideoTracks = () => this.video
  getTracks = () => this.track

  addTrack = () => {
    this.video = ["one video"]
    this.track = [{ stop: () => {} }]
  }
}

class RTCIceCandidate {}

class RTCSessionDescription {}

class MediaStreamTrack {}

class RTCPeerConnection {
  stream = null
  track = []
  localDescription = undefined

  constructor() {}

  addTrack = (track, stream) => {
    this.track = [...this.track, track]
    this.stream = stream
  }

  addIceCandidate = () => {
    this.ontrack({ track: this.track, streams: [this.stream] })
  }

  createOffer = createOfferMock

  setLocalDescription = (sdp) => {
    this.localDescription = sdp
    setLocalDescriptionMock(sdp)
  }

  setRemoteDescription = (sdp) => {
    this.onicecandidate({
      candidate: sdp,
    })
    setRemoteDescriptionMock(sdp)
  }

  createAnswer = () => {
    const self = this
    return new Promise((resolve) => {
      resolve(createAnswerMock())
      //when user addonice actually this get executed.
      self.ontrack({ track: this.track, streams: [this.stream] })
    })
  }

  close = closeMock
}

global.RTCPeerConnection = RTCPeerConnection
global.MediaStream = MediaStream
global.MediaStreamTrack = MediaStreamTrack
global.RTCSessionDescription = RTCSessionDescription
global.RTCIceCandidate = RTCIceCandidate
