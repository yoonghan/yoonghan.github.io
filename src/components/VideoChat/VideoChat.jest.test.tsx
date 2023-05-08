import { setVideo } from "../../__mocks__/windowMock"
import { screen, render, waitFor } from "@testing-library/react"
import VideoChat, { VideoStreamHandler } from "."
import { useRef } from "react"
import userEvent from "@testing-library/user-event"

describe("VideoChat", () => {
  beforeAll(() => {
    setVideo()
  })

  const renderComponent = ({
    record = true,
    videoFailedCallback = jest.fn(),
    videoTracksCallback = jest.fn(),
  }: {
    record?: boolean
    videoFailedCallback?: (exception: unknown) => void
    videoTracksCallback?: (mediaStream: MediaStream | undefined) => void
  }) => {
    return render(
      <VideoChat
        id="test"
        muted={true}
        record={record}
        videoFailedCallback={videoFailedCallback}
        videoTracksCallback={videoTracksCallback}
      />
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

  it("should call getMedia devices failed will trigger videoFailedCallback", async () => {
    const failCallback = jest.fn()
    const spyGetUserMedia = jest
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
      />
    )
    expect(stopFn).toHaveBeenCalledTimes(1)
    spyGetUserMedia.mockClear()
  })

  it("should be able to stop a video on unmount", async () => {
    const { videoTracks, stopFn, trackFn, spyGetUserMedia } = createUserMedia()
    const { unmount } = renderComponent({ videoTracksCallback: videoTracks })
    await waitFor(() => {
      expect(videoTracks).toHaveBeenCalledWith(trackFn)
    })
    unmount()
    expect(stopFn).toHaveBeenCalledTimes(1)
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
        </>
      )
    }

    it("should be able to assign video with custom stream", async () => {
      const streamData = "Stream data" as any
      const { videoTracks } = createUserMedia()
      render(
        <Wrapper videoTracksCallback={videoTracks} mediaStream={streamData} />
      )
      await waitFor(() => {
        expect(videoTracks).toHaveBeenCalled()
      })
      const video = screen.getByTestId("video-chat") as HTMLVideoElement
      expect(video.srcObject).toBe(null)
      await userEvent.click(screen.getByRole("button", { name: "Add" }))
      expect(video.srcObject).toBe(streamData)
    })
  })
})
