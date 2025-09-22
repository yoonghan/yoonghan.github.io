import { setVideo } from "@/__tests__/mocks/windowMock"
import { screen, render, waitFor } from "@testing-library/react"
import VideoChat, { VideoStreamHandler } from "."
import { useRef } from "react"
import userEvent from "@testing-library/user-event"

describe("VideoChat", () => {
  let oldVideoFn: () => void

  beforeAll(() => {
    oldVideoFn = setVideo()
  })

  afterAll(() => {
    oldVideoFn()
  })

  const renderComponent = ({
    record = true,
    videoFailedCallback = jest.fn(),
    videoTracksCallback = jest.fn(),
    noRef = false,
  }: {
    record?: boolean
    videoFailedCallback?: (exception: unknown) => void
    videoTracksCallback?: (mediaStream: MediaStream | undefined) => void
    noRef?: boolean
  }) => {
    return render(
      <VideoChat
        id="test"
        muted={true}
        record={record}
        videoFailedCallback={videoFailedCallback}
        videoTracksCallback={videoTracksCallback}
        noRef={noRef}
      />,
    )
  }

  const createUserMedia = () => {
    const videoTracks = jest.fn()
    const stopFn = jest.fn()
    const stopFnObj = { stop: stopFn }
    const trackFn = {
      getTracks: () => [stopFnObj],
    } as any
    const spyGetUserMedia = jest
      .spyOn(window.navigator.mediaDevices, "getUserMedia")
      .mockResolvedValueOnce(trackFn)
    return {
      videoTracks,
      stopFn,
      trackFn,
      spyGetUserMedia,
    }
  }

  it("should load with important attributes", () => {
    renderComponent({})
    const video = screen.getByTestId("video-chat") as HTMLVideoElement
    expect(video).toHaveAttribute("autoplay")
    expect(video).toHaveAttribute("playsInline")
    expect(video.muted).toBe(true)
  })

  it("should getMediaDevices failed/rejected, it will trigger videoFailedCallback", async () => {
    const failCallback = jest.fn()
    jest
      .spyOn(window.navigator.mediaDevices, "getUserMedia")
      .mockRejectedValueOnce("I failed")

    renderComponent({ videoFailedCallback: failCallback })
    await waitFor(() => {
      expect(failCallback).toHaveBeenCalledWith("I failed")
    })
  })

  it("should be able to get then stop a video", async () => {
    const { videoTracks, stopFn, trackFn, spyGetUserMedia } = createUserMedia()
    const { rerender } = renderComponent({ videoTracksCallback: videoTracks })
    await waitFor(() => {
      expect(videoTracks).toHaveBeenCalledWith(trackFn)
    })
    rerender(
      <VideoChat
        id="test"
        muted={true}
        record={false}
        videoFailedCallback={jest.fn()}
        videoTracksCallback={videoTracks}
      />,
    )

    await waitFor(() => {
      expect(stopFn).toHaveBeenCalledTimes(1)
    })
    spyGetUserMedia.mockClear()
  })

  it("should stop a video on unmount", async () => {
    const { videoTracks, stopFn, trackFn, spyGetUserMedia } = createUserMedia()
    const { unmount } = renderComponent({ videoTracksCallback: videoTracks })
    await waitFor(() => {
      expect(videoTracks).toHaveBeenCalledWith(trackFn)
    })
    unmount()

    await waitFor(() => {
      expect(stopFn).toHaveBeenCalledTimes(1)
    })
    spyGetUserMedia.mockClear()
  })

  describe("integration to pass stream", () => {
    const Wrapper = ({
      videoTracksCallback,
      mediaStream,
    }: {
      videoTracksCallback: () => void
      mediaStream: MediaStream
    }) => {
      const videoRef = useRef<VideoStreamHandler>(null)

      const addStreamToVideoOnClick = () => {
        if (videoRef.current !== null) {
          videoRef.current.stream(mediaStream)
        }
      }

      const stopStream = () => {
        if (videoRef.current !== null) {
          videoRef.current.stopStream()
        }
      }

      return (
        <>
          <VideoChat
            ref={videoRef}
            id="test"
            muted={true}
            record={false}
            videoFailedCallback={jest.fn()}
            videoTracksCallback={videoTracksCallback}
          />
          <button onClick={addStreamToVideoOnClick}>Add</button>
          <button onClick={stopStream}>Stop Stream</button>
        </>
      )
    }

    it("should be able to assign video with custom stream and stop it", async () => {
      const streamData = "Stream data" as any
      const { videoTracks } = createUserMedia()
      render(
        <Wrapper videoTracksCallback={videoTracks} mediaStream={streamData} />,
      )
      await waitFor(() => {
        expect(videoTracks).toHaveBeenCalled()
      })
      const video = screen.getByTestId("video-chat") as HTMLVideoElement
      expect(video.srcObject).toBe(null)
      await userEvent.click(screen.getByRole("button", { name: "Add" }))
      expect(video.srcObject).toBe(streamData)

      await userEvent.click(screen.getByRole("button", { name: "Stop Stream" }))
      expect(video.srcObject).toBe(null)
    })

    it("should function as expected if ref is not ready", async () => {
      const { unmount } = renderComponent({ noRef: true })
      const video = screen.getByTestId("video-chat") as HTMLVideoElement
      expect(video.srcObject).toBe(undefined)
      unmount()
    })
  })
})
