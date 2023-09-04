// register page to adopt
import Layout from "../components/Layout";
import AdoptionRegisterForm from "../components/forms/AdoptionRegisterForm";

export const metadata = {
  title: 'Adopt | Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

export default function Page() {
	return (
		<main>
			<Layout />
			<div className="py-16">
				<div className="container mx-auto px-16">
					<div className="mb-5">
						<h1 className="text-center text-4xl font-bold text-primary-black">Sign up</h1>
					</div>
					<div className="mb-10">
						<p className="text-secondary text-center text-lg">You are one step away from adopting a friend for life.</p>
					</div>
					<div className="w-1/2 m-auto">
						<AdoptionRegisterForm />
					</div>
				</div>
			</div>
		</main>
	)
}