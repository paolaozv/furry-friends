// register page to rehome a pet
import Layout from "../components/Layout";
import RehomeRegisterForm from "../components/forms/RehomeRegisterForm";

// Metadata
/**
 * It is used to define the application metadata,
 * which improves SEO and web shareability.
 */
export const metadata = {
  title: 'Rehome | Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

// Register page UI(User Interface) for users who wants to rehome a pet.
export default function Page() {
	return (
		<main>
			<Layout /><div className="py-8 lg:py-16">
				<div className="container mx-auto px-8 lg:px-16">
					<div className="mb-2 md:mb-5">
						<h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black">Sign up</h1>
					</div>
					<div className="mb-5 md:mb-10">
						<p className="text-secondary text-center text-sm md:text-base lg:text-lg">You can speed up your adoption process and help animals find a new home.</p>
					</div>
					<div className="md:w-3/4 xl:w-1/2 m-auto">
						<RehomeRegisterForm />
					</div>
				</div>
			</div>
		</main>
	)
}