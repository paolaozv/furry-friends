// pets context
"use client"; // This is a client component
import { createContext, useContext, useReducer } from "react";
import { initialState, petsReducer } from "./reducer/pets.reducer";

export const PetsContext = createContext({});

export const usePetsContext = () => useContext(PetsContext);

export const PetsContextProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(petsReducer, initialState);

  const addAPetToPetsList = (pet) => {
    const updatedPetsList = state.pets.concat(pet);

    dispatch({
      type: "ADD_A_PET_TO_PETS_LIST",
      payload: {
        pets: updatedPetsList
      }
    });
  };

  const addAllPetsToPetsList = (pets) => {
    dispatch({
      type: "ADD_ALL_PETS_TO_PETS_LIST",
      payload: {
        pets
      }
    })
  };

  const removeAPetFromPetsList = (petId) => {
    const updatedPetsList = state.pets.filter(
      (currentPet) => currentPet.id !== petId
    );

    dispatch({
      type: "REMOVE_A_PET_FROM_PETS_LIST",
      payload: {
        pets: updatedPetsList
      }
    });
  };

  const toggleModalToRemoveAPet = (id = state.idToRemove) => {

    dispatch({
      type: "TOGGLE_MODAL_TO_REMOVE_A_PET",
      payload: {
        openModal: !state.openModal,
        idToRemove: id
      }
    });
  }

  return (
    <PetsContext.Provider
      value={{
        pets: state.pets,
        idToRemove: state.idToRemove,
        openModal: state.openModal,
        addAPetToPetsList,
        addAllPetsToPetsList,
        removeAPetFromPetsList,
        toggleModalToRemoveAPet
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}