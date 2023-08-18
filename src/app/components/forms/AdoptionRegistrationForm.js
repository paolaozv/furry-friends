// adoption registration form
"use client"; // This is a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import signUp from "../../firebase/auth/signup";
import Spinner from "../ui/Spinner";

const schema = yup.object({
	firstName: yup.string().required("Field required"),
	lastName: yup.string().required("Field required"),
	email: yup.string().email("Invalid email").required("Field required"),
	password: yup.string().required("Field required").min(6, "Must be at least 6 characters"),
	confirmPassword: yup.string()
		.required("Field required")
		.min(6, "Must be at least 6 characters")
		.oneOf([yup.ref("password")], "Passwords do not match")
});

const AdoptionRegistrationForm = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const router = useRouter();

	const onSubmit = async (data) => {
		setLoading(true);
		setErrorMessage("");
		await signUp(data.email, data.password, data.firstName, data.lastName, "user").then(() => {
			setLoading(false);
			return router.push("/account");
		}).catch((error) => {
			console.log(error.message);
			if (error) {
				setError(true);
				setErrorMessage(error.message);
				setLoading(false);
			}
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="columns-2 gap-5 mb-5">
				<label>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						First Name
					</span>
					<input 
						{...register("firstName")}
						placeholder="First name"
						type="text"
						name="firstName"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					/>
					<p role="alert" className="text-red-700 text-xs">{errors.firstName?.message}</p>
				</label>
				<label>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Last Name
					</span>
					<input
						{...register("lastName")}
						type="text"
						name="lastName"
						placeholder="Last name"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					/>
					<p role="alert" className="text-red-700 text-xs">{errors.lastName?.message}</p>
				</label>
			</div>
			<div className="mb-5">
				<label>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Email
					</span>
					<input
						{...register("email")}
						type="email"
						name="email"
						placeholder="name@email.com"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					/>
					<p role="alert" className="text-red-700 text-xs">{errors.email?.message}</p>
				</label>
			</div>
			<div className="columns-2 gap-5 mb-2">
				<label>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Password
					</span>
					<input
						{...register("password")}
						type="password"
						name="password"
						placeholder="Password"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					/>
					<p role="alert" className="text-red-700 text-xs">{errors.password?.message}</p>
				</label>
				<label>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Confirm Password
					</span>
					<input
						{...register("confirmPassword")}
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					/>
					<p role="alert" className="text-red-700 text-xs">{errors.confirmPassword?.message}</p>
				</label>
			</div>
			<div className="mb-8">
				{error &&
					<p role="alert" className="text-red-700 text-xs">Something went wrong. {errorMessage}</p>
				}
			</div>
			<div className="w-full relative">
				<button
					disabled={loading}
					className={`w-full inline-flex items-center justify-center rounded-lg px-8 py-2 text-primary-black ${loading ? 'bg-primary/75 cursor-not-allowed' : 'bg-primary'}`}
				>
					{loading && <Spinner />}
					Register Now
				</button>
			</div>
		</form>
	)
}

export default AdoptionRegistrationForm;