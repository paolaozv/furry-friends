// components/Navbar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./ui/Logo";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

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
						<div onClick={toggleOpen}>
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
			</div>
			<div className={` ${open ? "block" : "hidden"} transition fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-white`}>
				<div className="p-4 h-full w-full relative">
					<div className="absolute right-4 top-4" onClick={toggleOpen}>
						<Image
							src="/close.svg"
							alt="Close"
							width={0}
							height={0}
							sizes="100vw"
							className="w-3 h-auto"
							priority
						/>
					</div>
					<div className="mt-12">
						<ul>
							<li className="m-5 text-primary-black text-sm lg:text-base flex items-center">
								<Image
									src="/chevron.svg"
									alt="Arrow"
									width={0}
									height={0}
									sizes="100vw"
									className="w-2 h-auto mr-2"
									priority
								/>
								<Link href="/register-adoption">I want to adopt</Link>
							</li>
							<li className="m-5 text-primary-black text-sm lg:text-base flex items-center">
								<Image
									src="/chevron.svg"
									alt="Arrow"
									width={0}
									height={0}
									sizes="100vw"
									className="w-2 h-auto mr-2"
									priority
								/>
								<Link href="/register-rehoming">I want to rehome</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;