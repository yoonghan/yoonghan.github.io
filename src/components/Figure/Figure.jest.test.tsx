import { render, screen } from "@testing-library/react"
import Figure from "."

describe("Figure", () => {
  it("should contain an image and figcaption", () => {
    render(
      <Figure
        imageProps={{
          width: 100,
          height: 100,
          src: "https://sample.com/dummy.png",
          alt: "test image",
        }}
        imageCaption="Dummy Pic"
      >
        <p>Sample Display</p>
      </Figure>,
    )
    expect(screen.getByRole("img", { name: "test image" })).toBeInTheDocument()
    expect(screen.getByText("Sample Display")).toBeInTheDocument()
    expect(screen.getByText("Dummy Pic")).toBeInTheDocument()
  })

  it("should contain order-1 if reversed", () => {
    render(
      <Figure
        imageProps={{
          width: 100,
          height: 100,
          src: "https://sample.com/dummy.png",
          alt: "test image",
        }}
        reversed={true}
        imageCaption="Dummy Pic"
      >
        <p>Sample Display</p>
      </Figure>,
    )
    expect(screen.getByRole("figure")).toHaveClass("md:order-1")
  })

  it("should contain alt to image with aria hidden", () => {
    render(
      <Figure
        imageProps={{
          width: 100,
          height: 100,
          src: "https://sample.com/dummy.png",
          alt: "test image",
        }}
        reversed={true}
        imageCaption="Dummy Pic"
      >
        <p>Sample Display</p>
      </Figure>,
    )
    expect(
      screen.queryByRole("img", {
        name: "Arrow to describe figure image of test image",
      }),
    ).not.toBeInTheDocument()
  })
})
