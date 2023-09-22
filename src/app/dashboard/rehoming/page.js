// Rehoming page
"use client"; // This is a client component
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth.context";
import RehomeAPetForm from "../../components/forms/RehomeAPetForm";

export default function Page() {
  const { userInfo } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (userInfo && userInfo.role === "user") router.push("/dashboard");
  }, [userInfo, router]);

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
          <h1 className="text-3xl font-bold text-primary-black">Rehome a furry friend</h1>
        </div>
        <div className="mt-16 mx-auto w-2/3">
          <RehomeAPetForm />
        </div>
      </div>
    </div>
  )
}