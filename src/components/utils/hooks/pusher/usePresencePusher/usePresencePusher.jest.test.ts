import { act, renderHook } from "@testing-library/react"
import { EnumConnectionStatus } from "../type/ConnectionStatus"
import { Presence, Props, usePresencePusher } from "."

describe("usePresencePusher", () => {
  const defaultProps: Props = {
    appKey: "APPKEY",
    cluster: "Cluster",
    authEndpoint: "/auth",
    updateConnectionCallback: jest.fn(),
    shouldUpdatedOfflineUserEnd: undefined,
  }

  const createPusher = (props = defaultProps) => {
    return renderHook(usePresencePusher, {
      initialProps: {
        appKey: props.appKey,
        cluster: props.cluster,
        authEndpoint: props.authEndpoint,
        updateConnectionCallback: props.updateConnectionCallback,
        shouldUpdatedOfflineUserEnd: props.shouldUpdatedOfflineUserEnd,
      },
    })
  }

  it("should have correct initial state when pusher is created", () => {
    const { result } = createPusher()
    const client = result.current
    expect(client.channelName).toBe("presence-wal-videocall")
  })

  describe("connection", () => {
    const trigger = (
      { emit, trigger }: any,
      eventName: string,
      data: object,
    ) => {
      emit(eventName, trigger(eventName, data))
    }

    const emitSubscriptionSuccess = (
      partialEmitFn: (eventName: string, message: object) => void,
      id = "billy",
      name = "Billy Joe",
    ) => {
      act(() => {
        partialEmitFn("pusher:subscription_succeeded", {
          members: { billy: { name }, ben: { name: "Ben" } },
          count: 1,
          myID: id,
          me: { id: id, info: { name } },
        })
      })
    }

    const emitAddUser = (
      username: string,
      partialEmitFn: (eventName: string, message: object) => void,
    ) => {
      act(() => {
        partialEmitFn("pusher:member_added", {
          id: username,
          info: { name: username },
        })
      })
    }

    it("should be able to connect", () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      act(() => {
        result.current.connect("billy")
      })
      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.StartConnecting,
      )

      emitSubscriptionSuccess(result.current.emit)

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Connected,
      )

      expect(result.current.myId).toBe("billy")
      expect(result.current.onlineUsers).toStrictEqual([
        { id: "ben", name: "Ben" },
      ])
    })

    it("should not be allowed to connect twice by returning to start connecting again", () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      act(() => {
        result.current.connect("billy")
      })

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.StartConnecting,
      )
      emitSubscriptionSuccess(result.current.emit)

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Connected,
      )

      act(() => {
        result.current.connect("new username, but will never be added")
      })

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Connected,
      )
    })

    it("should be allowed to connect again after disconnected", () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      act(() => {
        result.current.connect("billy")
      })
      emitSubscriptionSuccess(result.current.emit)

      act(() => {
        result.current.disconnect()
      })

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Disconnected,
      )

      expect(result.current.onlineUsers).toStrictEqual([])

      act(() => {
        result.current.connect("john")
      })

      act(() => {
        result.current.emit("pusher:subscription_succeeded", {
          members: { john: { name: "john" } },
          count: 1,
          myID: "john",
          me: { id: "john", info: { name: "john" } },
        })
      })

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Connected,
      )

      expect(result.current.myId).toBe("john")
    })

    it("should show error if connection fail", () => {
      const updateConnectionCallback = jest.fn()
      const error = {
        type: "AuthError",
        error: undefined,
      }
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })

      act(() => {
        result.current.connect("billy")
      })

      act(() => {
        result.current.emit("pusher:subscription_error", error)
      })

      expect(updateConnectionCallback).toHaveBeenCalledWith(
        EnumConnectionStatus.Error,
      )

      expect(result.current.errorMessage()).toBe(JSON.stringify(error))
    })

    it("should be able to add multiple user and remove user", () => {
      const updateConnectionCallback = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback,
      })
      act(() => {
        result.current.connect("billy")
      })
      emitSubscriptionSuccess(result.current.emit)
      emitAddUser("bob", result.current.emit)
      emitAddUser("john", result.current.emit)
      emitAddUser("alice", result.current.emit)
      expect(result.current.onlineUsers).toStrictEqual([
        { id: "ben", name: "Ben" },
        { id: "bob", name: "bob" },
        { id: "john", name: "john" },
        { id: "alice", name: "alice" },
      ])

      act(() => {
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

    it("should be able to bind and trigger", () => {
      const { result } = createPusher({
        ...defaultProps,
      })
      act(() => {
        result.current.connect("billy")
      })
      emitSubscriptionSuccess(result.current.emit)

      const clientCallback = jest.fn()
      act(() => {
        expect(
          result.current.bind<Presence>("client-event", clientCallback),
        ).toBeTruthy()
      })

      trigger(result.current, "client-event", {
        data: "test",
      })

      expect(clientCallback).toHaveBeenCalledWith({
        data: "test",
        from: "billy",
        fromName: "Billy Joe",
      })
    })

    it("should not be able to bind/trigger if user has not connected", () => {
      const { result } = createPusher({
        ...defaultProps,
      })

      expect(result.current.bind).toThrow(
        Error("Channel has not been initialized"),
      )

      expect(result.current.trigger).toThrow(
        Error("Channel has not been initialized"),
      )
    })

    it("should not allow binding to occur more than once unless disconnected and reconnect", () => {
      const { result } = createPusher({
        ...defaultProps,
      })
      act(() => {
        result.current.connect("billy")
      })

      const clientCallback = jest.fn()

      emitSubscriptionSuccess(result.current.emit)

      act(() => {
        result.current.bind<Presence>("client-event", clientCallback)
      })

      act(() => {
        expect(
          result.current.bind<Presence>("client-event", clientCallback),
        ).toBeFalsy()
      })

      act(() => {
        result.current.disconnect()
      })

      act(() => {
        result.current.connect("johnny")
      })

      emitSubscriptionSuccess(result.current.emit, "johnny", "Johnny Depp")

      const newClientCallback = jest.fn()
      act(() => {
        expect(
          result.current.bind<Presence>("client-event", newClientCallback),
        ).toBeTruthy()
      })
      trigger(result.current, "client-event", {
        data: "test",
      })
      expect(newClientCallback).toHaveBeenCalledWith({
        data: "test",
        from: "johnny",
        fromName: "Johnny Depp",
      })
    })

    it("should trigger updateoffline when user logs out", () => {
      const triggerRemoveUser = (
        shouldEnd: boolean,
        expectedStatus: EnumConnectionStatus,
      ) => {
        shouldUpdatedOfflineUserEndFn.mockReturnValueOnce(shouldEnd)
        act(() => {
          result.current.emit("pusher:member_removed", {
            id: "billy",
            info: { name: "Billy" },
          })
        })
        expect(shouldUpdatedOfflineUserEndFn).toHaveBeenCalled()
        expect(updateConnectionCallbackFn).toHaveBeenCalledWith(expectedStatus)
      }

      const updateConnectionCallbackFn = jest.fn()
      const shouldUpdatedOfflineUserEndFn = jest.fn()
      const { result } = createPusher({
        ...defaultProps,
        updateConnectionCallback: updateConnectionCallbackFn,
        shouldUpdatedOfflineUserEnd: shouldUpdatedOfflineUserEndFn,
      })
      act(() => {
        result.current.connect("billy")
      })

      const clientCallback = jest.fn()

      emitSubscriptionSuccess(result.current.emit)
      expect(updateConnectionCallbackFn).toHaveBeenCalledWith(
        EnumConnectionStatus.Connected,
      )

      act(() => {
        result.current.bind<Presence>("client-event", clientCallback)
      })

      triggerRemoveUser(false, EnumConnectionStatus.Connected)
      triggerRemoveUser(true, EnumConnectionStatus.Disconnected)
    })
  })
})
