import { renderHook } from "@testing-library/react"
import { usePusher } from "."
import { EnumConnectionStatus } from "./type/ConnectionStatus"
import { isEventEmitter, isNoOfUserEmitter } from "./type/Emitter"
import { act } from "react-dom/test-utils"
import React from "react"

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
    expect(client.getConnectionStatus()).toBe(EnumConnectionStatus.Disconnected)
    expect(client.isConnected()).toBe(false)
    expect(client.channelName).toBe("private-wal_CHANNEL")
    expect(client.eventName).toBe("client-RANDOM_EVENT")
    expect(printConnectionCallback).not.toBeCalled()
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

    await act(async () => {
      result.current.emitConnection("connected")
    })

    expect(result.current.getConnectionStatus()).toBe(
      EnumConnectionStatus.Connected
    )
    expect(result.current.isConnected()).toBe(true)
  })

  it("should not be able to send message when it's not connected", () => {
    const printEventCallback = jest.fn()
    const { result } = createPusher({ printEventCallback })
    expect(result.current.send("A message")).toBe(false)

    const noOfUserEmitter = result.current.emit("NoOfUsers")
    const eventEmitter = result.current.emit("Event")
    expect(
      isEventEmitter(eventEmitter) ? eventEmitter("A message", 0) : true
    ).toBe(false)

    expect(isNoOfUserEmitter(noOfUserEmitter) ? noOfUserEmitter(2) : true).toBe(
      false
    )
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
      expect(result.current.isConnected()).toBe(true)

      return {
        result,
        printConnectionCallback,
        printEventCallback,
      }
    }

    it("should be able to disconnect", async () => {
      const debugEventFn = jest.fn()
      const spy = jest
        .spyOn(React, "useDebugValue")
        .mockImplementation(debugEventFn)
      const { result } = await createConnectedPusher()
      await act(() => {
        result.current.disconnect()
      })

      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected()).toBe(false)
      expect(debugEventFn).toBeCalledWith("connection:Disconnected")
      spy.mockClear()
    })

    it("should be able to disconnect", async () => {
      const { result, printConnectionCallback } = await createConnectedPusher()
      await act(async () => {
        result.current.emitConnection("failed")
      })

      expect(printConnectionCallback).toBeCalledWith(
        "Connection failed as websocket is not supported by browser"
      )
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected()).toBe(false)
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
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Error
      )
      expect(result.current.isConnected()).toBe(true)
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
      expect(result.current.getConnectionStatus()).toBe(
        EnumConnectionStatus.Disconnected
      )
      expect(result.current.isConnected()).toBe(false)
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
        const emitter = result.current.emit("Event")
        const message = isEventEmitter(emitter)
          ? emitter("Hello message", 2)
          : false
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

    it("should be able to emit no of users", async () => {
      const { result, printConnectionCallback } = await createConnectedPusher()
      act(() => {
        const emitter = result.current.emit("NoOfUsers")
        const message = isNoOfUserEmitter(emitter) ? emitter(2) : false
        expect(message).toBe(true)
      })
      expect(printConnectionCallback).toBeCalledWith("Active user count: 2")
    })
  })
})
