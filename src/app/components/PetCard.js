"use client"; //  This is a client component
import Link from "next/link";
import { useAuthContext } from "@/context/auth.context";
import { usePetsContext } from "@/context/pets.context";
import BlurImage from "./ui/BlurImage";

const PetCard = ({ id, photo, name, age, breed, description }) => {
  const { userInfo } = useAuthContext();
  const { toggleModalToRemoveAPet } = usePetsContext();

  return (
    <div>
      <div className="h-64 w-96 relative">
        <BlurImage photo={photo} name={name} />
      </div>
      <div className="border-x border-b rounded-b-lg py-6 px-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg">{name}</h4>
          <p>{age}</p>
        </div>
        <p className="font-light text-sm">{breed}</p>
        <p className="mt-2">{description}</p>
        <div className="text-center mt-6">
          {!userInfo &&
            <Link href="/login" className="bg-primary rounded-lg px-6 py-1 text-primary-black">I want to adopt</Link>
          }
          {userInfo && userInfo.role === "admin" &&
            <button
              className="bg-primary rounded-lg px-6 py-1 text-primary-black"
              onClick={() => toggleModalToRemoveAPet(id)}
            >
              Remove for adoption
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default PetCard;