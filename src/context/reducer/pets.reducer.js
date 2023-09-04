export const initialState = {
  pets: [],
  openModal: false,
  idToRemove: null
};

export const petsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_A_PET_TO_PETS_LIST":
      console.log("ADD", payload);

      return {
        ...state,
        pets: payload.pets
      };

    case "ADD_ALL_PETS_TO_PETS_LIST":
      console.log("ADD ALL PETS", payload);

      return {
        ...state,
        pets: payload.pets
      };

    case "REMOVE_A_PET_FROM_PETS_LIST":
      console.log("REMOVE", payload);

      return {
        ...state,
        pets: payload.pets
      };

    case "TOGGLE_MODAL_TO_REMOVE_A_PET":
      console.log("OPEN_MODAL", payload);

      return {
        ...state,
        idToRemove: payload.idToRemove,
        openModal: payload.openModal
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}