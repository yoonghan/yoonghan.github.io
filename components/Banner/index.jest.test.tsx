import { render, screen } from "@testing-library/react";
import Banner from ".";

describe("Banner", () => {
  it("renders a heading", () => {
    render(<Banner />);
    expect(screen.getByText("I am a Banner")).toBeInTheDocument();
  });
});
