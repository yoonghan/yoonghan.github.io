import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Video from "."

describe("Video", () => {
  const renderComponent = ({
    src = "srcSample",
    imgJpgSrc = "imgJpgSrcSample",
    imgWebpSrc = "imgWebpSrcSample",
    imgAlt = "imgAltSample",
    preload = undefined,
    noRef = false,
  }: {
    src?: string
    imgJpgSrc?: string
    imgWebpSrc?: string
    imgAlt?: string
    preload?: string
    noRef?: boolean
  }) => {
    render(
      <Video
        src={src}
        imgJpgSrc={imgJpgSrc}
        imgWebpSrc={imgWebpSrc}
        imgAlt={imgAlt}
        preload={preload}
        noRef={noRef}
      />,
    )
    const video = screen.getByTestId("video") as HTMLVideoElement
    // eslint-disable-next-line testing-library/no-node-access
    const videoDivWrapper = video.parentElement as HTMLDivElement
    return { video, videoDivWrapper }
  }

  it("should render video with non-supported html", () => {
    renderComponent({})
    expect(screen.getByTestId("video")).toBeInTheDocument()
    expect(
      screen.getByText("Your browser does not support MP4 videos"),
    ).toBeInTheDocument()
  })

  describe("sound", () => {
    it("should render video sound off / video muted to apply to standard HTML rule for autoplay", () => {
      const { video } = renderComponent({})
      expect(
        screen.getByRole("button", { name: "with sound ( off )" }),
      ).toBeInTheDocument()
      expect(video.muted).toBe(true)
    })

    it("should render sound can be toggled", async () => {
      renderComponent({})
      await userEvent.click(
        screen.getByRole("button", { name: "with sound ( off )" }),
      )
      await userEvent.click(
        screen.getByRole("button", { name: "with sound ( on )" }),
      )
      await userEvent.click(
        screen.getByRole("button", { name: "with sound ( off )" }),
      )
    })
  })

  it("should play video when user hovers over, but sound is still off to comply to autoplay", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    expect(
      screen.getByRole("button", { name: "with sound ( off )" }),
    ).toBeInTheDocument()
    await userEvent.hover(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()
    expect(video).toHaveStyle({ opacity: 1 })
    expect(
      screen.getByRole("button", { name: "with sound ( off )" }),
    ).toBeInTheDocument()
  })

  it("should be able to play with sound when 'div' is pressed to play", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    expect(
      screen.getByRole("button", { name: "with sound ( off )" }),
    ).toBeInTheDocument()
    await userEvent.click(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()
    expect(video).toHaveStyle({ opacity: 1 })
    expect(
      screen.getByRole("button", { name: "with sound ( on )" }),
    ).toBeInTheDocument()
  })

  it("should stop playing when user unhover", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPlayFn = jest.fn()
    video.play = videoPlayFn
    const videoPauseFn = jest.fn()
    video.pause = videoPauseFn

    await userEvent.click(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()
    expect(video).toHaveStyle({ opacity: 1 })

    await userEvent.unhover(videoDivWrapper)
    expect(video).toHaveStyle({ opacity: 0 })
    expect(videoPauseFn).toHaveBeenCalled()
  })

  it("should play video when user click play  with sound on without unhovering out", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    await userEvent.click(
      screen.getByRole("button", { name: "with sound ( off )" }),
    )
    expect(
      screen.getByRole("button", { name: "with sound ( on )" }),
    ).toBeInTheDocument()

    fireEvent.click(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()
  })

  it("should play video when user click play, then click unplay with sound on", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPauseFn = jest.fn()
    video.pause = videoPauseFn
    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    await userEvent.click(
      screen.getByRole("button", { name: "with sound ( off )" }),
    )
    expect(
      screen.getByRole("button", { name: "with sound ( on )" }),
    ).toBeInTheDocument()

    fireEvent.click(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()

    fireEvent.click(videoDivWrapper)
    expect(videoPauseFn).toHaveBeenCalled()
  })

  it("should stop playing video when has sound turned on and play then unhover", async () => {
    const { video, videoDivWrapper } = renderComponent({})

    const videoPauseFn = jest.fn()
    video.pause = videoPauseFn
    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    await userEvent.click(
      screen.getByRole("button", { name: "with sound ( off )" }),
    )
    expect(
      screen.getByRole("button", { name: "with sound ( on )" }),
    ).toBeInTheDocument()

    fireEvent.click(videoDivWrapper)
    expect(videoPlayFn).toHaveBeenCalled()
    fireEvent.mouseOut(videoDivWrapper)
    expect(videoPauseFn).toHaveBeenCalled()
  })

  describe("preload", () => {
    it("can change preload type of the video", () => {
      const { video } = renderComponent({ preload: "none" })

      expect(video).toHaveAttribute("preload", "none")
    })

    it("can defaults as auto", () => {
      const { video } = renderComponent({})
    })
  })

  it("should work but without functionality if ref is not ready", async () => {
    const { video, videoDivWrapper } = renderComponent({ noRef: true })

    const videoPlayFn = jest.fn()
    video.play = videoPlayFn

    const videoPauseFn = jest.fn()
    video.pause = videoPauseFn

    await userEvent.click(
      screen.getByRole("button", { name: "with sound ( off )" }),
    )
    expect(video.muted).toBe(true)

    await userEvent.click(videoDivWrapper)
    expect(video.muted).toBe(true)

    await userEvent.click(videoDivWrapper)
    expect(videoPlayFn).not.toHaveBeenCalled()

    fireEvent.mouseOut(videoDivWrapper)
    expect(videoPauseFn).not.toHaveBeenCalled()
  })
})
