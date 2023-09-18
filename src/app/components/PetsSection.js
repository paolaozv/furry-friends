"use client" // This is a client component
import { useEffect, useState } from "react";
import { usePetsContext } from "@/context/pets.context";
import getAllPets from "../firebase/firestore/getAllPets";
import PetListForAdoption from "@/app/components/list/PetListForAdoption";

const PetsSection = () => {
  const { addAllPetsToPetsList, pets } = usePetsContext();
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    getPetsForAdoption();
  }, []);

  useEffect(() => {
    addAllPetsToPetsList(petsList);
  }, [petsList]);

  const getPetsForAdoption = async () => {
    const response = await getAllPets();

    setPetsList(response.docs.map((item) => {
      return { ...item.data(), id: item.id }
    }));
  }

  return (
    <div className="mt-20">
      <PetListForAdoption pets={pets} />
    </div>
  )
}

export default PetsSection;