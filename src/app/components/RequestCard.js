'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePetsContext } from "@/context/pets.context";
import filterPetData from "@/app/utilities/filterPetData";

const RequestCard = ({ applicant, email, petId }) => {
  const { pets } = usePetsContext();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const result = filterPetData(pets, petId);
    setPet(result[0]);
  }, [pets]);

  return (
    <div className="border border-solid border-primary-black border-opacity-40 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-primary-black">
          <h6 className="mb-1">
            <span className="font-semibold">Applicant: </span>
            {applicant}
          </h6>
          <h6>
            <span className="font-semibold">Applicant email: </span>
            {email}
          </h6>
        </div>
        <a
          href={`mailto:${email}?subject=Adoption Form to adopt ${pet && pet.name}`}
          className="bg-primary rounded-lg px-6 py-1 text-primary-black">
          Contact applicant
        </a>
      </div>
      <div className="border-t border-solid border-primary-black border-opacity-40"></div>
      <div className="mt-4 text-primary-black">
        <h6 className="font-semibold">Pet Information</h6>
        <div className="flex justify-between items-start">
          <div>
            <p>Name: {pet && pet.name}</p>
            <p>Breed: {pet && pet.breed}</p>
            <p>Age: {pet && pet.age}</p>
          </div>
          <div>
            <div
              style={{backgroundImage: `url(${pet && pet.photo})`}}
              className="bg-cover bg-center bg-no-repeat h-20 w-20 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard;