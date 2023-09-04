// components/Navbar.js
"use client"; // This is a client component
import Link from "next/link";
import Logo from "./ui/Logo";

const Navbar = () => {
	return (
		<header>
			<div className="container mx-auto py-8 px-14">
				<div className="flex justify-between items-center">
					<div>
						<Logo />
					</div>
					<div>
						<ul className="flex justify-between items-center">
							<li className="m-5 text-primary-black">
								<Link href="/register-adoption">I want to adopt</Link>
							</li>
							<li className="m-5 text-primary-black">
								<Link href="/register-rehoming">I want to rehome</Link>
							</li>
						</ul>
					</div>
					<div>
						<Link href="/login" className="bg-primary rounded-lg px-4 py-1 text-primary-black">Sign in</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;