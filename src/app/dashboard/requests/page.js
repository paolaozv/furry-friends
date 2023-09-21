// Requests page
"use client"; // This is a client component
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import Image from "next/image";
import Link from "next/link";
import getAllRequests from "@/app/firebase/firestore/getAllRequests";
import RequestList from "@/app/components/list/RequestList";

export default function Page() {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequestsForAdoption();
  }, []);

  const getAllRequestsForAdoption = async () => {
    try {
      const response = await getAllRequests(user.uid);

      setRequests(response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      }));
    } catch(error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container mx-auto px-20 py-6">
      <div>
        <div className="relative text-center">
          <div className="absolute left-0 bottom-0">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/arrow_left.svg"
                alt="Come back to dashboard"
                width={20}
                height={20}
                className="w-auto h-auto"
                priority
              />
              <p className="ml-2 text-sm font-light text-primary-black">Go back</p>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-primary-black">Check pet status</h1>
        </div>
        <div className="mt-16 mx-auto">
          <RequestList requests={requests} />
        </div>
      </div>
    </div>
  )
}