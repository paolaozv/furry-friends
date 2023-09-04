"use client"; // This is a client component
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { AuthContextProvider } from "@/context/auth.context";
import { PetsContextProvider } from "@/context/pets.context";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import UnProtectedRoute from "@/app/components/UnProtectedRoute";
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const noAuthRequired = ["/", "/login", "/register-adoption", "/register-rehoming"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          <PetsContextProvider>
            {noAuthRequired.includes(pathname) ?
              <UnProtectedRoute>
                {children}
              </UnProtectedRoute> :
              <ProtectedRoute>
                {children}
              </ProtectedRoute>
            }
          </PetsContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
