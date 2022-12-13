import { render, screen } from "@testing-library/react"
import { withNonEmptyEnvCheck } from "./withEnvCheck"

describe("withEnvCheck", () => {
  const DummyComponent = ({
    prop1,
    prop2,
  }: {
    prop1: string
    prop2?: string
  }) => {
    return <div>I Am Good</div>
  }

  describe("withNonEmptyEnvCheck", () => {
    it("should render error message when one of the prop passed is empty", () => {
      const WrappedComponent = withNonEmptyEnvCheck(DummyComponent)
      render(<WrappedComponent prop1="value" prop2={undefined} />)
      expect(
        screen.getByText("One of the enviroment variable is missing")
      ).toBeInTheDocument()
    })

    it("should render custom error message when one of the prop passed is empty", () => {
      const WrappedComponent = withNonEmptyEnvCheck(
        DummyComponent,
        "Custom Error"
      )
      render(<WrappedComponent prop1="" prop2="value" />)
      expect(screen.getByText("Custom Error")).toBeInTheDocument()
    })

    it("should render the right element when all properties are passed", () => {
      const WrappedComponent = withNonEmptyEnvCheck(DummyComponent)
      render(<WrappedComponent prop1="value1" prop2="value2" />)
      expect(screen.getByText("I Am Good")).toBeInTheDocument()
    })
  })
})
