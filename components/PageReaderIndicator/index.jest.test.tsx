import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PageReaderIndicator from ".";

describe("PageReaderIndicator", () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLDivElement.prototype,
    "offsetHeight"
  );
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    HTMLDivElement.prototype,
    "scrollHeight"
  );

  beforeAll(() => {
    Object.defineProperty(HTMLDivElement.prototype, "offsetHeight", {
      writable: true,
      value: 10,
    });
    Object.defineProperty(HTMLDivElement.prototype, "scrollHeight", {
      writable: true,
      value: 100,
    });
  });

  afterAll(() => {
    if (
      originalOffsetHeight !== undefined &&
      originalScrollHeight !== undefined
    ) {
      Object.defineProperty(
        HTMLDivElement.prototype,
        "offsetHeight",
        originalOffsetHeight
      );
      Object.defineProperty(
        HTMLDivElement.prototype,
        "scrollHeight",
        originalScrollHeight
      );
    }
  });

  const renderContainer = () => {
    const RootElem = () => {
      const containerRef = React.useRef<HTMLDivElement>(null);

      return (
        <div ref={containerRef} data-testid="test-container">
          <PageReaderIndicator scrollContainer={containerRef} />
        </div>
      );
    };

    return render(<RootElem />);
  };

  const assertScrollStatus = (
    scrollTop: number,
    expectedTextContent: string,
    expectedWidthPercentage: number
  ) => {
    const container = screen.getByTestId("test-container");
    const scrollContainer = screen.getByTestId("scroll-container");
    const scrollStatus = screen.getByTestId("scroll-status");
    fireEvent.scroll(container, { target: { scrollTop } });
    expect(scrollStatus).toHaveTextContent(expectedTextContent);
    expect(scrollContainer).toHaveStyle({
      width: `${expectedWidthPercentage}%`,
    });
  };

  it("should change element as screen is scrolled", () => {
    renderContainer();
    assertScrollStatus(30, "has more", 33);
    assertScrollStatus(60, "half way", 66);
    assertScrollStatus(80, "almost", 88);
    assertScrollStatus(90, "done", 100);
  });
});
