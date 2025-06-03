interface ActionType {
  type: string
}

interface AddUserAction extends ActionType {
  type: "ADD_USER"
  payload: { id: string; name: string }
}

interface RemoveUserAction extends ActionType {
  type: "REMOVE_USER"
  payload: { id: string }
}

interface ClearUserAction extends ActionType {
  type: "CLEAR_USERS"
}

export const onlineUserReducer = (
  state: { id: string; name: string }[],
  action: RemoveUserAction | ClearUserAction | AddUserAction,
) => {
  switch (action.type) {
    case "ADD_USER": {
      const user = action.payload
      return [...state, user]
    }
    case "REMOVE_USER": {
      const user = action.payload
      return state.filter((eachUser) => eachUser.id !== user.id)
    }
    case "CLEAR_USERS":
      return []
  }
}
