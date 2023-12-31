"use client";
import { usePetsContext } from "@/context/pets.context";
import PetListForAdoption from "@/app/components/list/PetListForAdoption";

const PetsSection = () => {
  const { pets } = usePetsContext();

  return (
    <div className="mt-8 md:mt-14 lg:mt-20">
      <PetListForAdoption pets={pets} />
    </div>
  )
}

export default PetsSection;