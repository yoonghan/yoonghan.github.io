import { onlineUserReducer } from "./onlineReducer"

describe("onlineReduer", () => {
  it("should be able to add user", () => {
    const latestState = onlineUserReducer([{ id: "alice" }], {
      type: "ADD_USER",
      payload: { id: "bob", name: "Bob" },
    })
    expect(latestState).toStrictEqual([
      { id: "alice" },
      { id: "bob", name: "Bob" },
    ])
  })

  it("should be able to remove user", () => {
    const latestState = onlineUserReducer([{ id: "alice" }], {
      type: "REMOVE_USER",
      payload: { id: "alice" },
    })
    expect(latestState).toStrictEqual([])
  })

  it("should be able to clear list of users", () => {
    const latestState = onlineUserReducer([{ id: "alice" }, { id: "bob" }], {
      type: "CLEAR_USERS",
      payload: { id: "" },
    })
    expect(latestState).toStrictEqual([])
  })
})
