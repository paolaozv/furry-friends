// pets context
"use client"; // This is a client component
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { initialState, petsReducer } from "./reducer/pets.reducer";
import { useAuthContext } from "@/context/auth.context";
import getAllPets from "@/app/firebase/firestore/getAllPets";
import getPetsByUid from "@/app/firebase/firestore/getPetsByUid";

export const PetsContext = createContext({});

export const usePetsContext = () => useContext(PetsContext);

export const PetsContextProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(petsReducer, initialState);
  const { userInfo, user, requests } = useAuthContext();
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    getPetsForAdoption();
  }, [userInfo, requests]);

  useEffect(() => {
    addAllPetsToPetsList(petsList);
  }, [petsList]);

  const getPetsForAdoption = async () => {
    try {
      if (userInfo && userInfo.role === "admin") {
        const response = await getPetsByUid(user.uid);

        setPetsList(response.docs.map((item) => {
          const requestSent = requests.includes(item.id);
          return { ...item.data(), id: item.id, requestSent }
        }));
      } else {
        const response = await getAllPets();

        setPetsList(response.docs.map((item) => {
          const requestSent = requests.includes(item.id);
          return { ...item.data(), id: item.id, requestSent }
        }));
      }
    } catch(error) {
      console.log("error", error);
    }
  }

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

  const toggleModalRequestForAdoption = (id = state.idPetAdoption, rescueGroup = state.rescueGroupId) => {
    dispatch({
      type: "TOGGLE_MODAL_REQUEST_FOR_ADOPTION",
      payload: {
        rescueGroupId: rescueGroup,
        idPetAdoption: id,
        confirmAdoptionModal: !state.confirmAdoptionModal
      }
    });
  }

  return (
    <PetsContext.Provider
      value={{
        pets: state.pets,
        idToRemove: state.idToRemove,
        openModal: state.openModal,
        idPetAdoption: state.idPetAdoption,
        confirmAdoptionModal: state.confirmAdoptionModal,
        rescueGroupId: state.rescueGroupId,
        addAPetToPetsList,
        addAllPetsToPetsList,
        removeAPetFromPetsList,
        toggleModalToRemoveAPet,
        toggleModalRequestForAdoption
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}