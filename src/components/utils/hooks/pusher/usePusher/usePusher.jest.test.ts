import { renderHook } from "@testing-library/react"
import { usePusher } from "."
import { EnumConnectionStatus } from "../type/ConnectionStatus"
import { isEventEmitter, isNoOfUserEmitter } from "../type/Emitter"
import { act } from "react"
import React from "react"
import { MessageType } from "../../../../Chat/config/MessageType"
import { encodeMessage } from "../../../../Chat/config/MessageFormatter"
import { trace } from "@opentelemetry/api"

jest.mock("@opentelemetry/api", () => ({
  trace: {
    getTracer: jest.fn(() => ({
      startActiveSpan: jest.fn((name, fn) => {
        if (typeof fn === "function") {
          return fn({ end: jest.fn(), setAttributes: jest.fn() })
        }
        return { end: jest.fn(), setAttributes: jest.fn() }
      }),
    })),
  },
  context: {
    active: jest.fn(),
    with: jest.fn((_, fn) => fn()),
  },
  propagation: {
    extract: jest.fn(),
    inject: jest.fn(),
  },
}))

describe("usePusher", () => {
  const createPusher = (props: {
    eventName?: string
    channelName?: string
    printConnectionCallback?: (message: string) => void
    printEventCallback?: (message: string) => void
    channelPrefix?: string
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
        channelPrefix: props.channelPrefix,
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
      channelPrefix: "private",
    })
    const client = result.current
    expect(client.getConnectionStatus()).toBe(EnumConnectionStatus.Disconnected)
    expect(client.isConnected()).toBe(false)
    expect(client.channelName).toBe("private-wal_CHANNEL")
    expect(client.eventName).toBe("client-RANDOM_EVENT")
    expect(printConnectionCallback).not.toHaveBeenCalled()
    expect(printEventCallback).not.toHaveBeenCalled()
  })

  it("should not create a channel name with private- prefixed if it is a non-private chat", () => {
    const printConnectionCallback = jest.fn()
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      channelName: "CHANNEL",
      eventName: "RANDOM_EVENT",
      printConnectionCallback,
      printEventCallback,
    })
    const client = result.current
    expect(client.channelName).toBe("wal_CHANNEL")
  })

  it("should be able to connect", () => {
    const printConnectionCallback = jest.fn()
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      printConnectionCallback,
      printEventCallback,
    })
    act(() => {
      result.current.connect()
    })
    expect(printConnectionCallback).toHaveBeenCalledWith(
      "Establishing Connection, please wait.",
      MessageType.TEXT,
    )

    act(() => {
      result.current.emitConnection("connected")
    })

    expect(result.current.getConnectionStatus()).toBe(
      EnumConnectionStatus.Connected,
    )
    expect(result.current.isConnected()).toBe(true)
  })

  it("should not be able to send message when it's not connected", () => {
    const printEventCallback = jest.fn()
    const { result } = createPusher({
      printEventCallback,
    })
    expect(result.current.send("A message", MessageType.TEXT)).toBe(false)

    const noOfUserEmitter = result.current.emit("NoOfUsers")
    const eventEmitter = result.current.emit("Event")
    expect(
      isEventEmitter(eventEmitter) ? eventEmitter("A message", 0) : true,
    ).toBe(false)

    expect(isNoOfUserEmitter(noOfUserEmitter) ? noOfUserEmitter(2) : true).toBe(
      false,
    )
  })

  describe("Connected behavior", () => {
    const createConnectedPusher = () => {
      const printConnectionCallback = jest.fn()
      const printEventCallback = jest.fn()
      const { result } = createPusher({
        printConnectionCallback,
        printEventCallback,
      })

      act(() => {
        result.current.connect()
        result.current.emitConnection("connected")
      })
      expect(result.current.isConnected()).toBe(true)

      return {
        result,
        printConnectionCallback,
        printEventCallback,
      }
    }

    it("should be able to disconnect", () => {
      const debugEventFn = jest.fn()
      const spy = jest
        .spyOn(React, "useDebugValue")
        .mockImplementation(debugEventFn)
      const { result } = createConnectedPusher()
      act(() => {
        result.current.disconnect()
      })

      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected,
      )
      expect(result.current.isConnected()).toBe(false)
      expect(debugEventFn).toHaveBeenCalledWith("connection:Disconnected")
      spy.mockClear()
    })

    it("should auto disconnect if fail", () => {
      const { result, printConnectionCallback } = createConnectedPusher()
      act(() => {
        result.current.emitConnection("failed")
      })

      expect(printConnectionCallback).toHaveBeenCalledWith(
        "Connection failed as websocket is not supported by browser",
        MessageType.CONNECTION_ERROR,
      )
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected,
      )
      expect(result.current.isConnected()).toBe(false)
    })

    it("should be able to handle general error", () => {
      jest.spyOn(console, "error").mockImplementation(() => {})

      const { result, printConnectionCallback } = createConnectedPusher()
      act(() => {
        result.current.emitConnection("error")
      })

      expect(printConnectionCallback).toHaveBeenCalledWith(
        "Interruption error encountered",
        MessageType.CONNECTION_ERROR,
      )
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Error,
      )
      expect(result.current.isConnected()).toBe(true)
    })

    it("should be able to handle websocket error", () => {
      const { result, printConnectionCallback } = createConnectedPusher()
      act(() => {
        result.current.emitConnection("error", {
          type: "WebSocketError",
          error: { data: { code: 0 } },
        })
      })

      expect(printConnectionCallback).toHaveBeenCalledWith(
        "A different Id was requested, please refresh the page.",
        MessageType.CONNECTION_ERROR,
      )
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected,
      )
      expect(result.current.isConnected()).toBe(false)
    })

    it("should be able to send message", () => {
      const { result, printEventCallback } = createConnectedPusher()
      act(() => {
        const message = result.current.send("Hello message", MessageType.TEXT)
        expect(message).toBe(false) // will always return false.
      })
      expect(printEventCallback).not.toHaveBeenCalled()
      expect(trace.getTracer).toHaveBeenCalledWith("pusher-hook")
    })

    it("should be able to emit message", () => {
      const { result, printEventCallback } = createConnectedPusher()
      act(() => {
        const emitter = result.current.emit("Event")
        const message = isEventEmitter(emitter)
          ? emitter("Hello message", 2)
          : false
        expect(message).toBe(true)
      })
      expect(printEventCallback).toHaveBeenCalledWith(
        "Hello message",
        MessageType.TEXT,
        2,
      )
      expect(trace.getTracer).toHaveBeenCalledWith("pusher-hook")
    })

    it("should be able to emit complex message", () => {
      const { result, printEventCallback } = createConnectedPusher()
      act(() => {
        const emitter = result.current.emit("Event")
        const message = isEventEmitter(emitter)
          ? emitter(encodeMessage("Hello message", MessageType.CONNECTION), 2)
          : false
        expect(message).toBe(true)
      })
      expect(printEventCallback).toHaveBeenCalledWith(
        "Hello message",
        MessageType.CONNECTION,
        2,
      )
    })

    it("should not allow, connection that is already connected", () => {
      const { result, printConnectionCallback } = createConnectedPusher()

      act(() => {
        result.current.connect()
      })

      expect(printConnectionCallback).toHaveBeenCalledWith(
        "Connection is already established",
        MessageType.TEXT,
      )
    })

    it("should be able to emit no of users", () => {
      const { result, printConnectionCallback } = createConnectedPusher()
      act(() => {
        const emitter = result.current.emit("NoOfUsers")
        const message = isNoOfUserEmitter(emitter) ? emitter(2) : false
        expect(message).toBe(true)
      })
      expect(printConnectionCallback).toHaveBeenCalledWith(
        "Active user count: 2",
        MessageType.USERCOUNT,
      )
    })

    it("should print connection status on connection", () => {
      const { printConnectionCallback } = createConnectedPusher()
      expect(printConnectionCallback).toHaveBeenCalledWith(
        `Status: ${EnumConnectionStatus.Connected}`,
        MessageType.CONNECTION,
      )
    })

    it("should not re-establish connection if already connected", () => {
      const { result, printConnectionCallback } = createConnectedPusher()
      printConnectionCallback.mockClear()
      act(() => {
        result.current.connect()
      })
      expect(printConnectionCallback).toHaveBeenCalledWith(
        "Connection is already established",
        MessageType.TEXT,
      )
      expect(printConnectionCallback).toHaveBeenCalledTimes(1)
    })

    it("should be considered connected when a specific websocket error occurs", () => {
      const { result } = createConnectedPusher()
      act(() => {
        result.current.emitConnection("error", {
          type: "WebSocketError",
          error: { data: { code: 1006 } },
        })
      })
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Error,
      )
      expect(result.current.isConnected()).toBe(true)
    })

    it("should not fail to emit if disconnected", () => {
      const { result } = createConnectedPusher()
      act(() => {
        result.current.disconnect()
      })
      act(() => {
        result.current.emitConnection("failed")
        result.current.emit("NoOfUsers")
        result.current.disconnect()
      })
    })
  })
})
