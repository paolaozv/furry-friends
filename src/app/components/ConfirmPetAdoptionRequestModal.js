"use client"; // This is a client component
import { useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { usePetsContext } from "@/context/pets.context";
import Spinner from "../components/ui/Spinner";
import requestForAdoption from "../firebase/firestore/requestForAdoption";

const ConfirmPetAdoptionRequestModal = () => {
  const { userInfo, user, addARequestToUser } = useAuthContext();
  const { confirmAdoptionModal, toggleModalRequestForAdoption, idPetAdoption, rescueGroupId } = usePetsContext();
  const [loading, setLoading] = useState(false);

  const confirmRequest = async () => {
    setLoading(true);

    try {
      await requestForAdoption(idPetAdoption, userInfo, user.uid, rescueGroupId);

      addARequestToUser(idPetAdoption);

      setLoading(false);
      toggleModalRequestForAdoption();
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={`${confirmAdoptionModal ? "block" : "hidden"} fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-600 bg-opacity-50`}>
      <div className="relative w-full h-full flex justify-center bg-transparent">
        <div className="relative bg-white rounded-lg shadow m-auto">
          <div className="p-6 md:p-10">
            <p className="text-center text-sm md:text-base">
              After your confirmation, a request will be sent to the rescue group of this pet,<br className="hidden md:inline" />
              and they will contact you by email.
            </p>
          </div>
          <div className="px-10 pb-10 rounded-b">
            <div className="flex items-center justify-between md:w-3/4 mx-auto">
              <button
                onClick={() => toggleModalRequestForAdoption()}
                className="bg-white border rounded-lg px-6 md:px-10 py-1 text-primary-black text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={confirmRequest}
                className="bg-primary rounded-lg px-6 md:px-8 py-1 text-primary-black flex items-center text-sm md:text-base"
              >
                {loading && <Spinner />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPetAdoptionRequestModal;