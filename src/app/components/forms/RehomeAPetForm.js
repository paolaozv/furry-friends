// rehome a pet form
"use client"; // This is a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../ui/Spinner";
import createPetProfile from "@/app/firebase/firestore/createPetProfile";
import { useAuthContext } from "@/context/auth.context";
import { usePetsContext } from "@/context/pets.context";

const schema = yup.object().shape({
  name: yup.string().required("Field required"),
  age: yup.number().positive().integer().required("Field required"),
  breed: yup.string().required("Field required"),
  photo: yup.mixed()
  .test("required", "Photo is required", value => value.length > 0)
  // .test("fileSize", "File size is too large", (value) => {
  //   return value.lenght && value[0].size <= 1048576;
  // })
  .test("fileType", "Unsupported file format", (value) => {
    return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
  }),
  description: yup.string().required("Field required")
});

const RehomeAPetForm = () => {
  const { userInfo } = useAuthContext();
  const { addAPetToPetsList } = usePetsContext();
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
      const response = await createPetProfile(data.name, data.age, data.breed, data.photo[0], data.description, userInfo.uid);

      setLoading(false);
      const pet = {
        id: response.doc.id,
        name: data.name,
        age: data.age,
        breed: data.breed,
        photo: response.url,
        description: data.description,
        uid: userInfo.uid
      };
      addAPetToPetsList(pet)
      
      // go to /dashboard
      return router.push("/dashboard");
    } catch(error) {
      console.log("error", error);
      if (error) {
        setError(true);
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-16 mb-6">
        <label className="mb-5 xl:mb-0 inline-block w-full xl:inline">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs md:text-sm font-medium text-slate-700">
            Pet's name
          </span>
          <input
            {...register("name")}
            type="text"
						name="name"
						placeholder="Pet's name"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-xs sm:text-sm focus:ring-1"
          />
          <p role="alert" className="text-red-700 text-xs">{errors.name?.message}</p>
        </label>
        <label>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs md:text-sm font-medium text-slate-700">
            Pet's age
          </span>
          <input
            {...register("age")}
            type="text"
						name="age"
						placeholder="Pet's age"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-xs sm:text-sm focus:ring-1"
          />
          <p role="alert" className="text-red-700 text-xs">{errors.age?.message}</p>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 mb-6">
        <label className="mb-5 xl:mb-0 inline-block w-full xl:inline">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs md:text-sm font-medium text-slate-700">
            Pet's breed
          </span>
          <input
            {...register("breed")}
            type="text"
						name="breed"
						placeholder="Pet's breed"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-xs sm:text-sm focus:ring-1"
          />
          <p role="alert" className="text-red-700 text-xs">{errors.breed?.message}</p>
        </label>
        <label>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs md:text-sm font-medium text-slate-700">
            Upload pet's photo
          </span>
          <input
            {...register("photo")}
            type="file"
            name="photo"
            accept="image/*"
            className="mt-1 w-full text-xs sm:text-sm text-slate-400 border border-slate-300 shadow-sm bg-red rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 file:bg-slate-100 file:border-none file:py-2 file:text-slate-700"
          />
          <p role="alert" className="text-red-700 text-xs">{errors.photo?.message}</p>
        </label>
      </div>
      <div>
        <label>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs md:text-sm font-medium text-slate-700">
            Pet's description
          </span>
          <textarea
            {...register("description")}
            type="text"
            rows={8}
						name="description"
						placeholder="Pet's description"
						className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-xs sm:text-sm focus:ring-1"
          />
          <p role="alert" className="text-red-700 text-xs">{errors.description?.message}</p>
        </label>
      </div>
      <div className="mt-2">
				{error &&
					<p role="alert" className="text-red-700 text-xs">Something went wrong. {errorMessage}</p>
				}
			</div>
      <div className="w-full relative mt-8">
				<button
          type="submit"
					disabled={loading}
					className={`w-full inline-flex items-center justify-center rounded-lg px-8 py-2 text-primary-black text-sm lg:text-base ${loading ? 'bg-primary/75 cursor-not-allowed' : 'bg-primary'}`}
				>
					{loading && <Spinner />}
					Create profile
				</button>
			</div>
    </form>
  )
}

export default RehomeAPetForm;