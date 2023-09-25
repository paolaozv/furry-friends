// components/ui/Logo.js
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="/">
			<div className="flex items-center">
				<Image
					src="/logo.svg"
					alt="Adopt a furry friend Logo"
					width={32}
					height={32}
					priority
				/>
				<p className="text-sm lg:text-base ml-4 text-primary-black">Adopt a furry friend</p>
			</div>
		</Link>
	)
}

export default Logo;