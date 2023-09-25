// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import Logo from "./ui/Logo";

const Navbar = () => {
	return (
		<header>
			<div className="container mx-auto py-4 px-7 lg:py-8 lg:px-14">
				<div className="flex justify-between items-center">
					<div>
						<Logo />
					</div>
					<div className="hidden md:block">
						<ul className="flex justify-between items-center">
							<li className="m-5 text-primary-black text-sm lg:text-base">
								<Link href="/register-adoption">I want to adopt</Link>
							</li>
							<li className="m-5 text-primary-black text-sm lg:text-base">
								<Link href="/register-rehoming">I want to rehome</Link>
							</li>
						</ul>
					</div>
					<div className="hidden md:block">
						<Link href="/login" className="bg-primary rounded-lg px-3 lg:px-4 py-1 text-primary-black text-sm lg:text-base">Sign in</Link>
					</div>
					<div className="block md:hidden">
						<Image
              src="/menu.svg"
              alt="Menu"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;