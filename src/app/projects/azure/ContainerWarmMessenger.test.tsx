import { render, screen } from "@testing-library/react"
import ContainerWarmMessenger from "./ContainerWarmMessenger"

describe("Container Warmer Messenger", () => {

    const renderComponent = () => {
        render(<ContainerWarmMessenger />)
    }

    it("should render correctly", () => {
        renderComponent()
        expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
        expect(screen.getAllByText(".")).toHaveLength(3)
    })
})
