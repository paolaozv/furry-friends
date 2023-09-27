"use client"; // This is a client component
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { AuthContextProvider } from "@/context/auth.context";
import { PetsContextProvider } from "@/context/pets.context";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import UnProtectedRoute from "@/app/components/UnProtectedRoute";
import "./globals.css"

// Google Font
const inter = Inter({
  subsets: ['latin'], // Used to reduce the size of the font file - improves performance.
  variable: '--font-inter', // To use in the CSS.
  display: 'swap' // Changes the font family after page has loaded.
})

const noAuthRequired = ["/", "/login", "/register-adoption", "/register-rehoming"];

// Root Layout
/**
 * UI(User Interface): This is a required layout,
 * and it is shared across all pages in the application
 */
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
