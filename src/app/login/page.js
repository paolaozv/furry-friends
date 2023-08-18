// register page to rehome a pet
import Layout from "../components/Layout";
import LoginForm from "../components/forms/LoginForm";

export const metadata = {
  title: 'Login | Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

export default function Page() {
	return (
		<main>
			<Layout />
			<div className="py-16 mb-10">
				<div className="container mx-auto px-16">
					<div className="mb-10">
						<h1 className="text-center text-4xl font-bold text-primary-black">Sign in</h1>
					</div>
					<div className="w-1/2 m-auto">
						<LoginForm />
					</div>
				</div>
			</div>
		</main>
	)
}