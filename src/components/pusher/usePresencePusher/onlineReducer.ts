export const onlineUserReducer = (
  state: { id: string; name?: string }[],
  action: {
    type: "ADD_USER" | "REMOVE_USER" | "CLEAR_USERS"
    payload: { id: string; name?: string }
  }
) => {
  const user = action.payload
  switch (action.type) {
    case "ADD_USER":
      return [...state, user]
    case "REMOVE_USER":
      return state.filter((eachUser) => eachUser.id !== user.id)
    case "CLEAR_USERS":
      return []
  }
}
