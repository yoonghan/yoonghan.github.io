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
    expect(client.channelName).toBe("presence-wal_videocall")
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

    it("should not be allowed to connect twice", async () => {
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

      await act(async () => {
        result.current.connect("new username, but will never be added")
      })

      expect(updateConnectionCallback).toBeCalledWith(
        EnumConnectionStatus.Connected
      )

      expect(result.current.myId).toBe("billy")
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
  })
})
