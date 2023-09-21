// adoption form
"use client" // This is a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import signIn from "../../firebase/auth/signin";
import Spinner from "../ui/Spinner";

const schema = yup.object({
	email: yup.string().email("Invalid email").required("Field required"),
	password: yup.string().required("Field required")
});

const LoginForm = () => {
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

		try {
			const response = await signIn(data.email, data.password);

			if (response) {
				setError(true);
				setErrorMessage(response.message);
				setLoading(false);
			}
		
			setLoading(false);
			return router.push("/dashboard");
		} catch(error) {
			if (error) {
				setError(true);
				setErrorMessage(error.message);
				setLoading(false);
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
			<div className="mb-2">
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
					Sign in
				</button>
			</div>
		</form>
	)
}

export default LoginForm;