// Dashboard Page
"use client"; // This is a client component
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/auth.context";
import { usePetsContext } from "@/context/pets.context";
import firebase_app from "@/app/firebase/config";
import getPetsList from "@/app/firebase/firestore/getPetsList";
import PetListForAdoption from "@/app/components/list/PetListForAdoption";
import RemovePetPopup from "@/app/components/RemovePetPopup";

const db = getFirestore(firebase_app);

export default function Page() {
  const { userInfo } = useAuthContext();
  const { addAllPetsToPetsList, pets } = usePetsContext();
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    getPetsForAdoption();
  }, []);

  useEffect(() => {
    addAllPetsToPetsList(petsList);
  }, [petsList]);

  const getPetsForAdoption = async () => {
    await getPetsList().then((data) => {
      console.log("DATA", data);
      setPetsList(data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })); 
    })
  }

  return (
    <div className="container relative mx-auto px-20 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src="/paw_print.svg"
              alt="Adopt a furry friend"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-4xl leading-normal">
              Welcome
              {userInfo && <span className="text-primary"> {userInfo.firstName}!</span>}
            </h1>
            {userInfo && userInfo.role === "user" ?
              <p className="text-base">
                Adopt a furry friend.
              </p> :
              <p className="text-base">
                Rehome a furry friend.
              </p>
            }
          </div>
        </div>
        {
          userInfo && userInfo.role === "admin" &&
          <div>
            <Link href="/dashboard/rehoming" className="bg-primary rounded-lg px-4 py-3 text-primary-black">Create a pet profile</Link>
          </div>
        }
      </div>
      <div className="mt-24">
        <h2 className="text-center font-semibold text-3xl leading-normal">Dogs ready for adoption</h2>
        <div className="mt-16">
          <PetListForAdoption pets={pets} />
        </div>
      </div>
      <RemovePetPopup />
    </div>
  )
}