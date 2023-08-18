"use client"; // This is a client component
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { AuthContextProvider } from "@/context/auth.context";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import UnProtectedRoute from "@/app/components/UnProtectedRoute";
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const noAuthRequired = ["/", "/login", "/adopt", "/rehome"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          {noAuthRequired.includes(pathname) ?
            <UnProtectedRoute>
              {children}
            </UnProtectedRoute> :
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          }
        </AuthContextProvider>
      </body>
    </html>
  )
}
