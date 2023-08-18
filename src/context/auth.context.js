// auth context
"use client";  // This is a client component
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import Loading from "@/app/components/ui/Loading";
import firebase_app from "@/app/firebase/config";
import getDocumentData from "@/app/firebase/firestore/getData";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children
}) => {
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				getDocumentData("users", user.uid).then((result) => {
					console.log(result);
					setUserInfo(result);
				});
				setUser(user);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const onSignOut = async () => {
		setLoading(true);
		await signOut(auth).then(() => {
			setLoading(false);
			return router.push("/");
		}).catch((error) => {
			setLoading(false);
		});
	};

	return (
		<AuthContext.Provider value={{user, userInfo, onSignOut}}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	);
};
