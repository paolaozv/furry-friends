export const initialState = {
  user: {
    requests: []
  }
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_A_REQUEST_TO_USER":

      return {
        ...state,
        user: {
          requests: payload.user.requests
        }
      };

    case "UPDATE_USER_REQUESTS":

      return {
        ...state,
        user: {
          requests: payload.requests
        }
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}