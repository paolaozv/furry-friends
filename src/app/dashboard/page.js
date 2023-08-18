// Dashboard Page
"use client"; // This is a client component
import Image from "next/image";
import { useAuthContext } from "@/context/auth.context";

export default function Page() {
  const { userInfo } = useAuthContext();

  console.log(userInfo);

  return (
    <div className="container mx-auto px-20 py-6">
      <div>
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src="/paw_print.svg"
              alt="Adopt a furry friend"
              width={40}
              height={40}
              priority
            />
          </div>
          <h1 className="font-bold text-4xl leading-normal">
            Welcome
            {userInfo && <span className="text-primary"> {userInfo.firstName}!</span>}
          </h1>
        </div>
        {/* <div className="mt-4">
          {userInfo && userInfo.role === "user" ?
            <p className="text-xl">
              Adopt a furry friend.
            </p> :
            <p className="text-xl">
              Rehome a furry friend.
            </p>
          }
        </div> */}
      </div>
      <div>
        
      </div>
    </div>
  )
}