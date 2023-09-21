export const initialState = {
  pets: [],
  openModal: false,
  idToRemove: null,
  confirmAdoptionModal: false,
  idPetAdoption: null,
  rescueGroupId: null
};

export const petsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_A_PET_TO_PETS_LIST":

      return {
        ...state,
        pets: payload.pets
      };

    case "ADD_ALL_PETS_TO_PETS_LIST":

      return {
        ...state,
        pets: payload.pets
      };

    case "REMOVE_A_PET_FROM_PETS_LIST":

      return {
        ...state,
        pets: payload.pets
      };

    case "TOGGLE_MODAL_TO_REMOVE_A_PET":

      return {
        ...state,
        idToRemove: payload.idToRemove,
        openModal: payload.openModal
      };

    case "TOGGLE_MODAL_REQUEST_FOR_ADOPTION":

      return {
        ...state,
        rescueGroupId: payload.rescueGroupId,
        idPetAdoption: payload.idPetAdoption,
        confirmAdoptionModal: payload.confirmAdoptionModal
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}