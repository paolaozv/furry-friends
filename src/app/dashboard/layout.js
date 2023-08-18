// Dashboard Layout
import ProtectedNavbar from "@/app/components/ProtectedNavbar";

export const metadata = {
  title: 'Dashboard | Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

export default function DashboardLayout({ children }) {
  return (
    <main>
      <ProtectedNavbar />
      {children}
    </main>
  )
}