import { render } from "@testing-library/react";
import HtmlHead from ".";

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: Array<React.ReactElement> }) => {
    return <>{children}</>;
  },
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ id, src }: { id: string; src: string }) => {
    return <script id={id} src={src} defer />;
  },
}));

describe("HtmlHead", () => {
  it("renders a heading with right header and title", () => {
    render(<HtmlHead title="Walcron" description="my description" />, {
      container: document.head,
    });
    expect(document.title).toEqual("Walcron");
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "my description"
    );
  });

  it("has all the meta datas", () => {
    render(<HtmlHead title="Walcron" description="my description" />, {
      container: document.head,
    });
    expect(document.head).toMatchSnapshot();
  });
});
