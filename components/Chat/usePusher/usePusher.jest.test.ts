import { renderHook } from "@testing-library/react"
import { EnumConnectionStatus, usePusher } from "."
import { act } from "react-dom/test-utils"

describe("usePusher", () => {
  const createPusher = (props: {
    eventName?: string
    channelName?: string
    printConnectionCallback?: (message: string) => void
    printEventCallback?: (message: string) => void
    nonprivate?: boolean
    authEndpoint?: string
  }) => {
    return renderHook(usePusher, {
      initialProps: {
        eventName: props.eventName || "TEST_EVENT_NAME",
        channelName: props.channelName || "TEST_CHANNEL_NAME",
        printConnectionCallback: props.printConnectionCallback || jest.fn(),
        printEventCallback: props.printEventCallback || jest.fn(),
        appKey: "TEST_APP_KEY",
        cluster: "TEST_CLUSTER",
        nonprivate: props.nonprivate,
        authEndpoint: props.authEndpoint,
      },
    })
  }

  it("should have correct initial state when pusher is created", () => {
    const printConnectionCallback = jest.fn()
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      channelName: "CHANNEL",
      eventName: "RANDOM_EVENT",
      printConnectionCallback,
      printEventCallback,
    })
    const client = result.current
    expect(client.connectionStatus).toBe(EnumConnectionStatus.Disconnected)
    expect(client.isConnected).toBe(false)
    expect(client.channelName).toBe("private-wal_CHANNEL")
    expect(client.eventName).toBe("client-RANDOM_EVENT")

    expect(printConnectionCallback).toBeCalledWith(
      "Changed Status: Disconnected"
    )
    expect(printEventCallback).not.toBeCalled()
  })

  it("should not create a channel name with private- prefixed if it is a non-private chat", () => {
    const printConnectionCallback = jest.fn()
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      channelName: "CHANNEL",
      eventName: "RANDOM_EVENT",
      printConnectionCallback,
      printEventCallback,
      nonprivate: true,
    })
    const client = result.current
    expect(client.channelName).toBe("wal_CHANNEL")
  })

  it("should be able to connect", async () => {
    const printConnectionCallback = jest.fn()
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      printConnectionCallback,
      printEventCallback,
    })
    await act(async () => {
      result.current.connect()
    })
    expect(printConnectionCallback).toBeCalledWith(
      "Establishing Connection, please wait."
    )
    expect(result.current.connectionStatus).toBe(
      EnumConnectionStatus.StartConnecting
    )
    await act(async () => {
      result.current.emitConnection("connected")
    })

    expect(result.current.connectionStatus).toBe(EnumConnectionStatus.Connected)
    expect(result.current.isConnected).toBe(true)
  })

  it("should not be able to send message when it's not connected", () => {
    const printEventCallback = jest.fn()
    const { result } = createPusher({ printEventCallback })
    expect(result.current.send("A message")).toBe(false)
    expect(result.current.emit("A message", 0)).toBe(false)
  })

  describe("Connected behavior", () => {
    const createConnectedPusher = async () => {
      const printConnectionCallback = jest.fn()
      const printEventCallback = jest.fn()
      const { result } = createPusher({
        printConnectionCallback,
        printEventCallback,
      })

      await act(async () => {
        result.current.connect()
        result.current.emitConnection("connected")
      })
      expect(result.current.isConnected).toBe(true)

      return {
        result,
        printConnectionCallback,
        printEventCallback,
      }
    }

    it("should be able to disconnect", async () => {
      const { result } = await createConnectedPusher()
      await act(() => {
        result.current.disconnect()
      })

      expect(result.current.connectionStatus).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected).toBe(false)
    })

    it("should be able to disconnect", async () => {
      const { result, printConnectionCallback } = await createConnectedPusher()
      await act(async () => {
        result.current.emitConnection("failed")
      })

      expect(printConnectionCallback).toBeCalledWith(
        "Connection failed as websocket is not supported by browser"
      )
      expect(result.current.connectionStatus).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected).toBe(false)
    })

    it("should be able to handle general error", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {})

      const { result, printConnectionCallback } = await createConnectedPusher()
      await act(async () => {
        result.current.emitConnection("error")
      })

      expect(printConnectionCallback).toBeCalledWith(
        "Interruption error encountered"
      )
      expect(result.current.connectionStatus).toBe(EnumConnectionStatus.Error)
      expect(result.current.isConnected).toBe(true)
    })

    it("should be able to handle websocket error", async () => {
      const { result, printConnectionCallback } = await createConnectedPusher()
      await act(async () => {
        result.current.emitConnection("error", {
          type: "WebSocketError",
          error: { data: { code: 0 } },
        })
      })

      expect(printConnectionCallback).toBeCalledWith(
        "A different Id was requested, please refresh the page."
      )
      expect(result.current.connectionStatus).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected).toBe(false)
    })

    it("should be able to send message", async () => {
      const { result, printEventCallback } = await createConnectedPusher()
      act(() => {
        const message = result.current.send("Hello message")
        expect(message).toBe(false) //will always return false, doesn't matter
      })
      expect(printEventCallback).not.toBeCalled()
    })

    it("should be able to emit message", async () => {
      const { result, printEventCallback } = await createConnectedPusher()
      act(() => {
        const message = result.current.emit("Hello message", 2)
        expect(message).toBe(true)
      })
      expect(printEventCallback).toBeCalledWith("Hello message", 2)
    })

    it("should not allow, connection that is already connected", async () => {
      const { result, printConnectionCallback } = await createConnectedPusher()

      await act(async () => {
        result.current.connect()
      })

      expect(printConnectionCallback).toBeCalledWith(
        "Connection is already established"
      )
    })
  })
})
