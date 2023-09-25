"use client"; // This is a client component
import { useState } from "react";
import { usePetsContext } from "@/context/pets.context";
import Spinner from "../components/ui/Spinner";
import deleteAPetProfile from "../firebase/firestore/deleteAPetProfile";

const RemovePetModal = () => {
  const { openModal, toggleModalToRemoveAPet, idToRemove, removeAPetFromPetsList } = usePetsContext();
  const [loading, setLoading] = useState(false);

  const confirmDeletion = async () => {
    setLoading(true);

    try {
      await deleteAPetProfile(idToRemove);
      setLoading(false);
      toggleModalToRemoveAPet();
      removeAPetFromPetsList(idToRemove);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={`${openModal ? "block" : "hidden"} fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-600 bg-opacity-50`}>
      <div className="relative w-full h-full flex justify-center bg-transparent">
        <div className="relative bg-white rounded-lg shadow m-auto">
          <div className="p-6 space-y-6">
            <p className="text-sm md:text-base">Are you sure you want to delete a pet?</p>
          </div>
          <div className="flex items-center justify-between p-6 rounded-b">
            <button
              onClick={() => toggleModalToRemoveAPet()}
              className="bg-white border rounded-lg px-3 lg:px-6 py-1 text-primary-black text-sm lg:text-base"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={confirmDeletion}
              className="bg-primary rounded-lg px-3 lg:px-4 py-1 text-primary-black flex items-center text-sm lg:text-base"
            >
              {loading && <Spinner />}
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemovePetModal;