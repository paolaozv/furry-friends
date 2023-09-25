// components/Navbar.js
"use client"; // This is a client component
import Link from "next/link";
import { useAuthContext } from "@/context/auth.context";
import Logo from "./ui/Logo";

const ProtectedNavbar = () => {
	const { user, onSignOut } = useAuthContext();

	return (
		<header>
			<div className="container mx-auto py-4 px-7 lg:py-8 lg:px-14">
				<div className="flex justify-between items-center">
					<div>
						<Logo />
					</div>
					{!user ?
						<div>
							<Link href="/login" className="bg-primary rounded-lg px-4 py-1 text-primary-black text-sm lg:text-base">Sign in</Link>
						</div> :
						<div>
							<button onClick={() => onSignOut()} className="bg-white border border-black rounded-lg px-2 md:px-4 py-1 text-primary-black text-sm lg:text-base">Log out</button>
						</div>
					}
				</div>
			</div>
		</header>
	);
};

export default ProtectedNavbar;