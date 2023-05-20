import { onlineUserReducer } from "./onlineReducer"

describe("onlineReduer", () => {
  it("should be able to add user", () => {
    const latestState = onlineUserReducer([{ id: "alice", name: "Alice" }], {
      type: "ADD_USER",
      payload: { id: "bob", name: "Bob" },
    })
    expect(latestState).toStrictEqual([
      { id: "alice", name: "Alice" },
      { id: "bob", name: "Bob" },
    ])
  })

  it("should be able to remove user", () => {
    const latestState = onlineUserReducer([{ id: "alice", name: "Alice" }], {
      type: "REMOVE_USER",
      payload: { id: "alice" },
    })
    expect(latestState).toStrictEqual([])
  })

  it("should be able to clear list of users", () => {
    const latestState = onlineUserReducer(
      [
        { id: "alice", name: "" },
        { id: "bob", name: "" },
      ],
      {
        type: "CLEAR_USERS",
      }
    )
    expect(latestState).toStrictEqual([])
  })
})
