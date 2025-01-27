import { render, screen } from "@testing-library/react"
import { exec } from "./ExecuteCommand"
import "@/__tests__/mocks/windowMock"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

describe("CommandBar", () => {
  let routeCallback: jest.Mock<any, any>
  let routeBackCallback: jest.Mock<any, any>
  let specialInputCallback: jest.Mock<any, any>

  const createCommandBar = (
    routeLocation: string | undefined | null = "/samplePage"
  ) => {
    routeCallback = jest.fn()
    routeBackCallback = jest.fn()
    const globalAny = global
    const divElement = globalAny.document.createElement("div")
    const cancelCallback = jest.fn()
    const route = {
      push: routeCallback,
      back: routeBackCallback,
    } as unknown as AppRouterInstance
    specialInputCallback = jest.fn()
    return exec(
      divElement,
      cancelCallback,
      route,
      routeLocation,
      specialInputCallback
    )
  }

  it("should return nothing if command is empty", function () {
    expect(createCommandBar()("")).toBeUndefined()
  })

  describe("Invalid Input", () => {
    it("should inform me of invalid input and direct to help", function () {
      render(<div>{createCommandBar()("I am not a valid input")}</div>)
      expect(
        screen.getByText("I am... - not found. type HELP.")
      ).toBeInTheDocument()
    })
  })

  describe("Math", () => {
    it("can count 1 plus 1", function () {
      render(<div>{createCommandBar()("=1+1")}</div>)
      expect(screen.getByText("Output: 2")).toBeInTheDocument()
    })

    it("can solve complex arithmetic", function () {
      render(<div>{createCommandBar()("=1+1*2 + 7")}</div>)
      expect(screen.getByText("Output: 10")).toBeInTheDocument()
    })

    it("knows it is non-math", function () {
      render(<div>{createCommandBar()("=1+A+2")}</div>)
      expect(screen.getByText("Msg: Unable to evaluate.")).toBeInTheDocument()
    })

    it("can provide instruction", function () {
      render(<div>{createCommandBar()("=")}</div>)
      expect(screen.getByText("Msg: Provide an equation")).toBeInTheDocument()
    })
  })

  describe("whoami", () => {
    it("should return who i am", function () {
      render(<div>{createCommandBar()("whoami")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/about")
    })

    it("should return who i am with sudo", function () {
      render(<div>{createCommandBar()("su - walcron")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/about")
    })

    it("should return error if current page is about", function () {
      render(<div>{createCommandBar("/about")("su - walcron")}</div>)
      expect(routeCallback).not.toHaveBeenLastCalledWith()
      expect(screen.getByText("Msg: This is the page")).toBeInTheDocument()
    })
  })

  describe("history", () => {
    it("should return history", function () {
      render(<div>{createCommandBar()("history")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/history")
    })

    it("should return history", function () {
      render(<div>{createCommandBar()("cd history")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/history")
    })

    it("should return error if current page is history", function () {
      render(<div>{createCommandBar("/history")("cd /history")}</div>)
      expect(routeCallback).not.toHaveBeenLastCalledWith()
      expect(screen.getByText("Msg: This is the page")).toBeInTheDocument()
    })
  })

  describe("pwd", () => {
    it("should return current url", function () {
      render(<div>{createCommandBar()("pwd")}</div>)
      expect(routeCallback).not.toHaveBeenCalled()
      expect(screen.getByText("Output: /samplePage")).toBeInTheDocument()
    })

    it("should return root if pathname detected is null", function () {
      render(<div>{createCommandBar(null)("pwd")}</div>)
      expect(routeCallback).not.toHaveBeenCalled()
      expect(screen.getByText("Output: /")).toBeInTheDocument()
    })
  })

  describe("ls", () => {
    it("should return projects page", function () {
      render(<div>{createCommandBar()("ls")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/projects")
    })

    it("should return error if current page is projects", function () {
      render(<div>{createCommandBar("/projects")("ls")}</div>)
      expect(routeCallback).not.toHaveBeenLastCalledWith()
      expect(screen.getByText("Msg: This is the page")).toBeInTheDocument()
    })
  })

  describe("main", () => {
    it("should return to main when exit is keyed", function () {
      render(<div>{createCommandBar()("exit")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/")
    })

    it("should inform it's invalid to exit on a main page", function () {
      render(<div>{createCommandBar("/")("exit")}</div>)
      expect(routeCallback).not.toHaveBeenCalled()
      expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
    })

    it("should inform it's invalid to exit on a main page", function () {
      render(<div>{createCommandBar("/")("exit")}</div>)
      expect(routeCallback).not.toHaveBeenCalled()
      expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
    })

    it("should work with matching synonym", function () {
      render(<div>{createCommandBar()("cd /")}</div>)
      expect(routeCallback).toHaveBeenLastCalledWith("/")
    })
  })

  describe("cd ..", () => {
    it("should return to previous page", function () {
      render(<div>{createCommandBar()("cd ..")}</div>)
      expect(routeBackCallback).toHaveBeenCalled()
      expect(routeCallback).not.toHaveBeenCalled()
    })

    it("should inform it's invalid to exit on a main page", function () {
      render(<div>{createCommandBar("/")("cd ..")}</div>)
      expect(routeCallback).not.toHaveBeenCalled()
      expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
    })
  })

  describe("share", () => {
    it("should attach share", function () {
      render(<div>{createCommandBar()("share")}</div>)
      expect(
        screen.getByText("Msg: Couldn't run HTML5 share.")
      ).toBeInTheDocument()
    })

    it("should attach share", function () {
      const sharedCallback = jest.fn()
      window.navigator.share = sharedCallback
      render(<div>{createCommandBar()("share")}</div>)
      expect(sharedCallback).toHaveBeenCalledWith({
        title: "Walcron",
        text: "An awesome website.",
        url: "https://www.walcron.com",
      })
    })
  })

  describe("help", () => {
    it("should show help", function () {
      render(<div>{createCommandBar()("help")}</div>)
      expect(screen.getByText("Help")).toBeInTheDocument()
    })

    it("should show help non case sensitive", function () {
      render(<div>{createCommandBar()("hElP")}</div>)
      expect(screen.getByText("Help")).toBeInTheDocument()
    })

    it("should show help with whitespace", function () {
      render(<div>{createCommandBar()("help    ")}</div>)
      expect(screen.getByText("Help")).toBeInTheDocument()
    })
  })

  describe("pwa", () => {
    it("should show pwa", function () {
      render(<div>{createCommandBar()("pwa")}</div>)
      expect(screen.getByText("Progressive Web App")).toBeInTheDocument()
    })

    it("should show pwa if typed offline", function () {
      render(<div>{createCommandBar()("offline")}</div>)
      expect(screen.getByText("Progressive Web App")).toBeInTheDocument()
    })
  })

  describe("no-animate", () => {
    it("should update location with no-animate", function () {
      render(<div>{createCommandBar()("no-animate")}</div>)
      expect(window.location.href).toBe("/samplePage?animate=none")
    })

    it("should append location with no-animate", function () {
      render(<div>{createCommandBar("/page?q=1")("no-animate")}</div>)
      expect(window.location.href).toBe("/page?q=1&animate=none")
    })
  })
})
