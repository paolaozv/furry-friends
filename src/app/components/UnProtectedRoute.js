// components/ProtectedRoute.js
"use client"; // This is a client component
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth.context";

const UnProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <div>
      {!user ? children : null}
    </div>
  )
};

export default UnProtectedRoute;