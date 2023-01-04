import { render } from "@testing-library/react"
import HtmlHead from "."

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: Array<React.ReactElement> }) => {
    return <>{children}</>
  },
}))

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ id, src }: { id: string; src: string }) => {
    return <script id={id} src={src} defer />
  },
}))

describe("HtmlHead", () => {
  it("renders a heading with right header and title", () => {
    render(<HtmlHead title="Walcron" description="my description" />, {
      container: document.head,
    })
    expect(document.title).toEqual("Walcron")
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "my description"
    )
  })

  it("has all the meta datas", () => {
    render(<HtmlHead title="Walcron" description="my description" />, {
      container: document.head,
    })
    expect(document.head).toMatchSnapshot()
    expect(document.head.innerHTML).toContain("viewport")
  })

  it("has all the meta datas except viewport", () => {
    render(
      <HtmlHead title="Walcron" description="my description" isAmp={true} />,
      {
        container: document.head,
      }
    )
    expect(document.head).toMatchSnapshot()
    expect(document.head.innerHTML).not.toContain("viewport")
  })

  it("has canonical info", () => {
    render(
      <HtmlHead
        title="Walcron"
        description="my description"
        canonical={"canonical info"}
      />,
      {
        container: document.head,
      }
    )
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "canonical info"
    )
  })
})
