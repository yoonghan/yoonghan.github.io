import { act, renderHook } from "@testing-library/react"
import { EnumConnectionStatus } from "../type/ConnectionStatus"
import { Props, usePresencePusher } from "."

describe("usePresencePusher", () => {
  const defaultProps: Props = {
    appKey: "APPKEY",
    cluster: "Cluster",
    authEndpoint: "/auth",
    updateConnectionCallback: jest.fn(),
  }

  const createPusher = (props = defaultProps) => {
    return renderHook(usePresencePusher, {
      initialProps: {
        appKey: props.appKey,
        cluster: props.cluster,
        authEndpoint: props.authEndpoint,
        updateConnectionCallback: props.updateConnectionCallback,
      },
    })
  }

  it("should have correct initial state when pusher is created", () => {
    const { result } = createPusher()
    const client = result.current
    expect(client.channelName).toBe("presence-wal-videocall")
  })

  describe("connection", () => {
    const emitSubscriptionSuccess = async (
      partialEmitFn: (eventName: string, message: object) => void
    ) => {
      await act(async () => {
        partialEmitFn("pusher:subscription_succeeded", {
          members: { billy: { name: "billy" }, ben: { name: "Ben" } },
          count: 1,
          myID: "billy",
          me: { id: "billy", info: { name: "billy" } },
        })
      })
    }

    const emitAddUser = async (
      username: string,
      partialEmitFn: (eventName: string, message: object) => void
    ) => {
      await act(async () => {
        partialEmitFn("pusher:member_added", {
          id: username,
          info: { name: username },
        })
      })
    }

    it("should be able to connect", async () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      await act(async () => {
        result.current.connect("billy")
      })
      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.StartConnecting
      )

      await emitSubscriptionSuccess(result.current.emit)

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Connected
      )

      expect(result.current.myId).toBe("billy")
      expect(result.current.onlineUsers).toStrictEqual([
        { id: "ben", name: "Ben" },
      ])
    })

    it("should not be allowed to connect twice by returning to start connecting again", async () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      await act(async () => {
        result.current.connect("billy")
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.StartConnecting
      )
      await emitSubscriptionSuccess(result.current.emit)

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Connected
      )

      await act(async () => {
        result.current.connect("new username, but will never be added")
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Connected
      )
    })

    it("should be allowed to connect again after disconnected", async () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      await act(async () => {
        result.current.connect("billy")
      })
      await emitSubscriptionSuccess(result.current.emit)

      await act(async () => {
        result.current.disconnect()
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Disconnected
      )

      expect(result.current.onlineUsers).toStrictEqual([])

      await act(async () => {
        result.current.connect("john")
      })

      await act(async () => {
        result.current.emit("pusher:subscription_succeeded", {
          members: { john: { name: "john" } },
          count: 1,
          myID: "john",
          me: { id: "john", info: { name: "john" } },
        })
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Connected
      )

      expect(result.current.myId).toBe("john")
    })

    it("should show error if connection fail", async () => {
      const updateConnectionCallback = jest.fn()
      const error = {
        type: "AuthError",
        error: undefined,
      }
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })

      await act(async () => {
        result.current.connect("billy")
      })

      await act(async () => {
        result.current.emit("pusher:subscription_error", error)
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Error
      )

      expect(result.current.errorMessage()).toBe(JSON.stringify(error))
    })

    it("should be able to add multiple user and remove user", async () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      await act(async () => {
        result.current.connect("billy")
      })
      await emitSubscriptionSuccess(result.current.emit)
      await emitAddUser("bob", result.current.emit)
      await emitAddUser("john", result.current.emit)
      await emitAddUser("alice", result.current.emit)
      expect(result.current.onlineUsers).toStrictEqual([
        { id: "ben", name: "Ben" },
        { id: "bob", name: "bob" },
        { id: "john", name: "john" },
        { id: "alice", name: "alice" },
      ])

      await act(async () => {
        result.current.emit("pusher:member_removed", {
          id: "john",
        })
      })
      expect(result.current.onlineUsers).toStrictEqual([
        { id: "ben", name: "Ben" },
        { id: "bob", name: "bob" },
        { id: "alice", name: "alice" },
      ])
    })

    it("should be able to bind and trigger", async () => {
      const { result } = createPusher({
        ...defaultProps,
      })
      await act(async () => {
        result.current.connect("billy")
      })
      await emitSubscriptionSuccess(result.current.emit)

      const clientCallback = jest.fn()
      act(() => {
        expect(
          result.current.bind<{}>("client-event", clientCallback)
        ).toBeTruthy()
      })
      result.current.trigger("client-event", { data: "test" })
      // not able to test callback
    })

    it("should not be able to bind/trigger if user has not connected", async () => {
      const { result } = createPusher({
        ...defaultProps,
      })

      expect(result.current.bind).toThrow(
        Error("Channel has not been initialized")
      )

      expect(result.current.trigger).toThrow(
        Error("Channel has not been initialized")
      )
    })

    it("should not allow binding to occur more than once unless disconnected and reconnect", async () => {
      const { result } = createPusher({
        ...defaultProps,
      })
      await act(async () => {
        result.current.connect("billy")
      })

      const clientCallback = jest.fn()
      act(() => {
        expect(
          result.current.bind<{}>("client-event", clientCallback)
        ).toBeTruthy()
      })

      act(() => {
        expect(
          result.current.bind<{}>("client-event", clientCallback)
        ).toBeFalsy()
      })

      await act(async () => {
        result.current.disconnect()
      })

      await act(async () => {
        result.current.connect("billy")
      })

      act(() => {
        expect(
          result.current.bind<{}>("client-event", clientCallback)
        ).toBeTruthy()
      })
    })
  })
})
