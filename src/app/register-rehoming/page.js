// register page to rehome a pet
import Layout from "../components/Layout";
import RehomeRegisterForm from "../components/forms/RehomeRegisterForm";

export const metadata = {
  title: 'Rehome | Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

export default function Page() {
	return (
		<main>
			<Layout /><div className="py-16">
				<div className="container mx-auto px-16">
					<div className="mb-5">
						<h1 className="text-center text-4xl font-bold text-primary-black">Sign up</h1>
					</div>
					<div className="mb-10">
						<p className="text-secondary text-center text-lg">You can speed up your adoption process and help animals find a new home.</p>
					</div>
					<div className="w-1/2 m-auto">
						<RehomeRegisterForm />
					</div>
				</div>
			</div>
		</main>
	)
}