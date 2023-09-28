"use client"; //  This is a client component
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { usePetsContext } from "@/context/pets.context";
import BlurImage from "./ui/BlurImage";

const PetCard = ({ id, photo, name, age, breed, description, rescueGroup, requestSent }) => {
  const { userInfo } = useAuthContext();
  const { toggleModalToRemoveAPet, toggleModalRequestForAdoption } = usePetsContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <div>
      <div className="relative">
        <BlurImage photo={photo} name={name} />
      </div>
      <div className="border-x border-b rounded-b-lg py-4 px-3 md:py-6 md:px-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-base lg:text-lg">{name}</h4>
          <p className="text-sm lg:text-base">Age: {age}</p>
        </div>
        <p className="font-light text-xs lg:text-sm">Breed: {breed}</p>
        <p className="mt-2 text-sm lg:text-base">{description}</p>
        <div className="text-center mt-3 lg:mt-6">
          {!user &&
            <Link href="/login" className="bg-primary rounded-lg px-3 lg:px-6 py-1 text-primary-black text-sm lg:text-base">I want to adopt</Link>
          }
          {user && user.role === "admin" &&
            <button
              className="bg-primary rounded-lg px-3 lg:px-6 py-1 text-primary-black text-sm lg:text-base"
              onClick={() => toggleModalToRemoveAPet(id)}
            >
              Remove for adoption
            </button>
          }
          {user && user.role === "user" && requestSent === false &&
            <button
              className="bg-primary rounded-lg px-3 lg:px-6 py-1 text-primary-black text-sm lg:text-base"
              onClick={() => toggleModalRequestForAdoption(id, rescueGroup)}
            >
              I want to adopt
            </button>
          }
          {user && user.role === "user" && requestSent === true &&
            <button
              className="bg-secondary bg-opacity-30 rounded-lg px-3 lg:px-6 py-1 text-secondary cursor-not-allowed text-sm lg:text-base"
              disabled
            >
              Request sent
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default PetCard;